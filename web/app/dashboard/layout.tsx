import { AuthProvider } from "@/context/auth-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <main className="p-6">{children}</main>
      </div>
    </AuthProvider>
  );
}
