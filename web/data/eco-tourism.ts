import type { EcoTourismArea } from "./types";

export const ECO_TOURISM_AREAS: EcoTourismArea[] = [
  {
    slug: "twa-sorong",
    name: "Taman Wisata Alam Sorong",
    description:
      "Hutan tropis dengan air terjun dan jalur trekking sepanjang 5km. Terletak di pinggiran Kota Sorong, kawasan ini menawarkan pengalaman alam yang mudah diakses dengan keanekaragaman flora dan fauna khas Papua.",
    location: { lat: -0.8833, lng: 131.25, regency: "Kota Sorong" },
    heroImage: "/placeholder/twa-sorong-hero.jpg",
    gallery: ["/placeholder/twa-sorong-1.jpg", "/placeholder/twa-sorong-2.jpg"],
    facilities: ["Jalur trekking", "Shelter", "Toilet umum", "Area parkir", "Pusat informasi"],
    rules: [
      "Dilarang membuang sampah",
      "Dilarang membawa api",
      "Wajib didampingi guide untuk jalur B",
      "Dilarang memberi makan satwa liar",
    ],
    packages: [
      { id: "regular-dom", name: "Tiket Masuk Domestik", price: 15000, currency: "IDR", unit: "orang", maxQty: 50 },
      { id: "regular-int", name: "Tiket Masuk Internasional", price: 150000, currency: "IDR", unit: "orang", maxQty: 20 },
      { id: "guided-tour", name: "Paket Tur Berpemandu", price: 500000, currency: "IDR", unit: "grup", maxQty: 5, maxGroupSize: 10 },
    ],
    operatingHours: "06:00 - 17:00 WIT",
    closedDays: [],
    rating: 4.5,
    reviewCount: 128,
  },
  {
    slug: "twa-gunung-meja",
    name: "Taman Wisata Alam Gunung Meja",
    description:
      "Area konservasi perkotaan dengan hutan hujan dataran rendah dan keanekaragaman anggrek. Terletak di jantung Kota Manokwari, kawasan ini menjadi laboratorium alam dan paru-paru kota.",
    location: { lat: -0.87, lng: 134.08, regency: "Kota Manokwari" },
    heroImage: "/placeholder/twa-gunung-meja-hero.jpg",
    gallery: ["/placeholder/twa-gunung-meja-1.jpg"],
    facilities: ["Jalur trekking", "Menara pandang", "Pusat informasi", "Area parkir"],
    rules: [
      "Dilarang memetik tanaman",
      "Dilarang memberi makan satwa",
      "Dilarang membuang sampah sembarangan",
    ],
    packages: [
      { id: "regular-dom", name: "Tiket Masuk Domestik", price: 10000, currency: "IDR", unit: "orang", maxQty: 100 },
      { id: "regular-int", name: "Tiket Masuk Internasional", price: 100000, currency: "IDR", unit: "orang", maxQty: 30 },
    ],
    operatingHours: "07:00 - 16:00 WIT",
    closedDays: ["Senin"],
    rating: 4.2,
    reviewCount: 89,
  },
  {
    slug: "twa-klamono",
    name: "Taman Wisata Alam Klamono",
    description:
      "Danau alami dikelilingi hutan tropis, habitat burung air dan reptil endemik. Danau Klamono juga memiliki fenomena unik berupa minyak bumi yang muncul ke permukaan secara alami.",
    location: { lat: -1.1167, lng: 131.3333, regency: "Kab. Sorong" },
    heroImage: "/placeholder/twa-klamono-hero.jpg",
    gallery: [],
    facilities: ["Area piknik", "Shelter", "Dermaga"],
    rules: [
      "Dilarang berenang",
      "Dilarang memancing tanpa izin",
      "Dilarang membawa hewan peliharaan",
    ],
    packages: [
      { id: "regular-dom", name: "Tiket Masuk Domestik", price: 10000, currency: "IDR", unit: "orang", maxQty: 80 },
      { id: "regular-int", name: "Tiket Masuk Internasional", price: 100000, currency: "IDR", unit: "orang", maxQty: 20 },
    ],
    operatingHours: "06:00 - 17:00 WIT",
    closedDays: [],
    rating: 4.0,
    reviewCount: 45,
  },
];

export function getEcoTourismAreaBySlug(slug: string): EcoTourismArea | undefined {
  return ECO_TOURISM_AREAS.find((area) => area.slug === slug);
}
