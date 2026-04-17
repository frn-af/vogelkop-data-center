"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Search } from "lucide-react";

export default function PesananPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="mx-auto max-w-2xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Layanan Publik", href: "/layanan" },
          { label: "Tiket Wisata", href: "/layanan/tiket-wisata" },
          { label: "Pesanan Saya" },
        ]}
      />

      <h1 className="mt-8 text-2xl font-bold tracking-tight">Pesanan Saya</h1>
      <p className="mt-2 text-muted-foreground">Cari pesanan menggunakan nomor booking atau email.</p>

      <form onSubmit={handleSearch} className="mt-6 flex gap-2">
        <Input
          placeholder="TWA-20260415-0001 atau email@contoh.com"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="gap-2"><Search className="size-4" /> Cari</Button>
      </form>

      {searched && (
        <Card className="mt-8">
          <CardContent className="p-6 text-center text-muted-foreground">
            Tidak ada pesanan ditemukan. Sistem booking online sedang dalam pengembangan.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
