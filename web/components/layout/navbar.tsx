"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const services = [
  { title: "SIMAKSI — Izin Masuk Kawasan", href: "/layanan/simaksi", description: "Permohonan izin masuk kawasan konservasi" },
  { title: "Perizinan Flora & Fauna", href: "/layanan/perizinan-flora-fauna", description: "Penangkaran, peredaran, dan pengangkutan" },
  { title: "Lapor Insiden", href: "/layanan/laporan-insiden", description: "Konflik satwa liar & kebakaran hutan" },
  { title: "Tiket Wisata", href: "/layanan/tiket-wisata", description: "Booking tiket masuk kawasan wisata alam" },
  { title: "Lacak Permohonan", href: "/layanan/lacak", description: "Cek status permohonan Anda" },
];

const profileLinks = [
  { title: "Tentang Kami", href: "/profil/tentang-kami" },
  { title: "Visi & Misi", href: "/profil/visi-misi" },
  { title: "Struktur Organisasi", href: "/profil/struktur-organisasi" },
  { title: "Wilayah Kerja", href: "/profil/wilayah-kerja" },
  { title: "Kontak", href: "/profil/kontak" },
];

const mobileLinks = [
  { title: "Beranda", href: "/" },
  { title: "Layanan Publik", href: "/layanan" },
  { title: "Kawasan Konservasi", href: "/kawasan" },
  { title: "Berita", href: "/berita" },
  { title: "Galeri", href: "/galeri" },
  { title: "Edukasi", href: "/edukasi" },
  { title: "Regulasi", href: "/regulasi" },
  { title: "Tentang Kami", href: "/profil/tentang-kami" },
  { title: "Kontak", href: "/profil/kontak" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-[var(--padding-section-x)]">
        <Link href="/" className="flex items-center gap-2">
          <TreePine className="size-7 text-primary" />
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight">BBKSDA</span>
            <span className="text-[10px] leading-tight text-muted-foreground">Papua Barat Daya</span>
          </div>
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Layanan</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-1 p-3 md:w-[500px] md:grid-cols-2">
                  {services.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink render={<Link href={item.href} />} className="flex-col items-start gap-0">
                        <div className="text-sm font-medium leading-none">{item.title}</div>
                        <p className="mt-1 line-clamp-2 text-xs leading-snug text-muted-foreground">
                          {item.description}
                        </p>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Profil</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[220px] gap-1 p-3">
                  {profileLinks.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink render={<Link href={item.href} />}>
                        {item.title}
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink render={<Link href="/kawasan" />} className={cn(navigationMenuTriggerStyle())}>
                Kawasan
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink render={<Link href="/berita" />} className={cn(navigationMenuTriggerStyle())}>
                Berita
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink render={<Link href="/galeri" />} className={cn(navigationMenuTriggerStyle())}>
                Galeri
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-3">
          <Link href="/layanan" className="hidden sm:inline-flex">
            <Button>Layanan Online</Button>
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" />}>
              <Menu className="size-5" />
              <span className="sr-only">Buka menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="mt-8 flex flex-col gap-1">
                {mobileLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="mt-4 border-t pt-4">
                  <Link href="/layanan" onClick={() => setMobileOpen(false)} className="block">
                    <Button className="w-full">Layanan Online</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
