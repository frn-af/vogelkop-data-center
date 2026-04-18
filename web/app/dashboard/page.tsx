"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Memuat...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Selamat datang, {user.name ?? user.email}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {user.avatar && (
            <img
              src={user.avatar}
              alt=""
              className="size-8 rounded-full"
            />
          )}
          <span className="text-sm capitalize text-muted-foreground">
            {user.role ?? "viewer"}
          </span>
          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6 text-card-foreground">
        <p className="text-sm text-muted-foreground">
          Halaman ini akan menampilkan ringkasan data pengelolaan kawasan
          konservasi.
        </p>
      </div>
    </div>
  );
}
