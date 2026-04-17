import type { UrgencyLevel, SLATarget } from "@/data/types";

export const SITE_NAME = "BBKSDA Papua Barat Daya";
export const SITE_FULL_NAME =
  "Balai Besar Konservasi Sumber Daya Alam Papua Barat Daya";
export const SITE_DESCRIPTION =
  "Portal resmi Balai Besar Konservasi Sumber Daya Alam Papua Barat Daya — Layanan publik, perizinan, dan informasi kawasan konservasi di Semenanjung Kepala Burung.";
export const SITE_URL = "https://bbksda-pbd.go.id";

export const CONTACT = {
  address: "Jl. Basuki Rahmat, Kota Sorong, Papua Barat Daya 98416",
  phone: "(0951) 321-456",
  fax: "(0951) 321-457",
  email: "info@bbksda-pbd.go.id",
  officeHours: "Senin-Jumat, 08:00-16:00 WIT",
} as const;

export const SLA_TARGETS: Record<UrgencyLevel, SLATarget> = {
  darurat: { responseHours: 2, resolutionHours: 24 },
  segera: { responseHours: 24, resolutionHours: 72 },
  normal: { responseHours: 72, resolutionHours: 168 },
};

export const SIMAKSI_SLA_DAYS = 5;

export const FILE_LIMITS = {
  document: 5 * 1024 * 1024,
  image: 10 * 1024 * 1024,
  video: 50 * 1024 * 1024,
  maxImages: 5,
} as const;

export const ACCEPTED_FILE_TYPES = {
  document: ".pdf,.doc,.docx",
  image: ".jpg,.jpeg,.png,.webp",
  video: ".mp4,.mov,.avi",
} as const;

export const NAV_LINKS = {
  services: [
    { title: "SIMAKSI — Izin Masuk Kawasan", href: "/layanan/simaksi", description: "Permohonan izin masuk kawasan konservasi" },
    { title: "Perizinan Flora & Fauna", href: "/layanan/perizinan-flora-fauna", description: "Penangkaran, peredaran, dan pengangkutan" },
    { title: "Lapor Insiden", href: "/layanan/laporan-insiden", description: "Konflik satwa liar & kebakaran hutan" },
    { title: "Tiket Wisata", href: "/layanan/tiket-wisata", description: "Booking tiket masuk kawasan wisata alam" },
    { title: "Lacak Permohonan", href: "/layanan/lacak", description: "Cek status permohonan Anda" },
  ],
  profile: [
    { title: "Tentang Kami", href: "/profil/tentang-kami" },
    { title: "Visi & Misi", href: "/profil/visi-misi" },
    { title: "Struktur Organisasi", href: "/profil/struktur-organisasi" },
    { title: "Wilayah Kerja", href: "/profil/wilayah-kerja" },
    { title: "Kontak", href: "/profil/kontak" },
  ],
} as const;
