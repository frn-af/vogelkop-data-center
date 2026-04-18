"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "@/lib/api-client";

interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  role: string | null;
  is_active: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface MeResponse {
  user: AuthUser;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.get<MeResponse>("/auth/me");
      setUser(data.user);
    } catch (err) {
      if (err instanceof Error && err.message === "Unauthorized") {
        setUser(null);
      } else {
        setError(err instanceof Error ? err.message : "Failed to fetch user");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // intentional: logout proceeds even if the API call fails
    }
    setUser(null);
    window.location.href = "/auth/login";
  }, []);

  return (
    <AuthContext value={{ user, loading, error, logout, refresh: fetchUser }}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
