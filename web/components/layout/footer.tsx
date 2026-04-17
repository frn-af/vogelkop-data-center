import Link from "next/link";
import { TreePine, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { title: "Layanan Publik", href: "/layanan" },
  { title: "Kawasan Konservasi", href: "/kawasan" },
  { title: "Berita", href: "/berita" },
  { title: "Galeri Keanekaragaman", href: "/galeri" },
  { title: "Edukasi", href: "/edukasi" },
  { title: "FAQ", href: "/edukasi/faq" },
];

const legalLinks = [
  { title: "Tentang BBKSDA PBD", href: "/profil/tentang-kami" },
  { title: "Struktur Organisasi", href: "/profil/struktur-organisasi" },
  { title: "Regulasi", href: "/regulasi" },
  { title: "Unduhan", href: "/edukasi/unduh" },
];

export function Footer() {
  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <TreePine className="size-7" />
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight">BBKSDA</span>
                <span className="text-[10px] leading-tight opacity-70">Papua Barat Daya</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed opacity-70">
              Balai Besar Konservasi Sumber Daya Alam Papua Barat Daya — Melindungi keanekaragaman hayati di Semenanjung Kepala Burung.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Tautan Cepat</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm opacity-70 transition-opacity hover:opacity-100">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Institusi</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm opacity-70 transition-opacity hover:opacity-100">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 opacity-70" />
                <span className="text-sm opacity-70">Jl. Basuki Rahmat, Kota Sorong, Papua Barat Daya 98416</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 opacity-70" />
                <a href="tel:+62951321456" className="text-sm opacity-70 transition-opacity hover:opacity-100">(0951) 321-456</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 opacity-70" />
                <a href="mailto:info@bbksda-pbd.go.id" className="text-sm opacity-70 transition-opacity hover:opacity-100">info@bbksda-pbd.go.id</a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs opacity-50">
            &copy; {new Date().getFullYear()} Balai Besar KSDA Papua Barat Daya — Kementerian Lingkungan Hidup dan Kehutanan
          </p>
          <p className="text-xs opacity-50">
            Sistem Pemerintahan Berbasis Elektronik (SPBE)
          </p>
        </div>
      </div>
    </footer>
  );
}
