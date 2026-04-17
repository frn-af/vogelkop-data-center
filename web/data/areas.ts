import type { ConservationArea } from "./types";

export const CONSERVATION_AREAS: ConservationArea[] = [
  {
    id: "ca-pegunungan-arfak",
    slug: "pegunungan-arfak",
    name: "Cagar Alam Pegunungan Arfak",
    type: "CA",
    description:
      "Kawasan pegunungan dengan ketinggian hingga 2.940 mdpl yang merupakan habitat utama berbagai spesies endemik Papua termasuk Cenderawasih Vogelkop dan Kupu-kupu Sayap Burung. Hutan montane dan sub-alpine yang masih perawan menjadikan kawasan ini salah satu hotspot keanekaragaman hayati terpenting di dunia.",
    location: { lat: -1.1, lng: 133.9, regency: "Kab. Pegunungan Arfak" },
    areaHectares: 68325,
    established: "1982",
    legalBasis: "SK Menteri Kehutanan No. 783/Kpts-II/1982",
    heroImage: "/placeholder/ca-arfak-hero.jpg",
    gallery: ["/placeholder/ca-arfak-1.jpg", "/placeholder/ca-arfak-2.jpg"],
    biodiversityHighlights: [
      "Cenderawasih Vogelkop (Lophorina superba)",
      "Kupu-kupu Sayap Burung (Ornithoptera spp.)",
      "Anggrek endemik dataran tinggi",
      "Kanguru Pohon Wondiwoi (Dendrolagus mayri)",
    ],
    accessInfo:
      "Akses melalui Kota Manokwari, kemudian perjalanan darat 3-4 jam ke Desa Mokwam sebagai base camp. Jalur trekking tersedia dengan pemandu lokal.",
    facilities: ["Base camp", "Jalur trekking", "Pos jaga"],
  },
  {
    id: "ca-tamrau-selatan",
    slug: "tamrau-selatan",
    name: "Cagar Alam Tamrau Selatan",
    type: "CA",
    description:
      "Hutan hujan dataran rendah dan perbukitan yang membentang di kawasan Tambrauw bagian selatan. Kawasan ini menyimpan kekayaan flora dan fauna yang belum banyak terungkap oleh penelitian ilmiah.",
    location: { lat: -0.8, lng: 132.5, regency: "Kab. Tambrauw" },
    areaHectares: 225155,
    established: "1982",
    legalBasis: "SK Menteri Kehutanan No. 784/Kpts-II/1982",
    heroImage: "/placeholder/ca-tamrau-hero.jpg",
    gallery: ["/placeholder/ca-tamrau-1.jpg"],
    biodiversityHighlights: [
      "Kasuari Gelambir Ganda (Casuarius casuarius)",
      "Kuskus beruang (Ailurops ursinus)",
      "Hutan sagu alami",
    ],
    accessInfo:
      "Akses melalui Kota Sorong kemudian perjalanan darat ke Sausapor. Kawasan sulit dijangkau, diperlukan pemandu lokal dan persiapan logistik.",
    facilities: ["Pos jaga perbatasan"],
  },
  {
    id: "ca-pulau-besar",
    slug: "pulau-besar",
    name: "Cagar Alam Pulau Besar",
    type: "CA",
    description:
      "Pulau kecil dengan ekosistem hutan hujan tropis yang masih utuh, menjadi habitat penting bagi satwa endemik kepulauan.",
    location: { lat: -0.35, lng: 130.7, regency: "Kab. Raja Ampat" },
    areaHectares: 10000,
    established: "1990",
    legalBasis: "SK Menteri Kehutanan No. 320/Kpts-II/1990",
    heroImage: "/placeholder/ca-pulau-besar-hero.jpg",
    gallery: [],
    biodiversityHighlights: [
      "Ekosistem pulau kecil",
      "Terumbu karang pesisir",
      "Burung pantai migrasi",
    ],
    accessInfo:
      "Akses melalui speedboat dari Sorong atau Waisai. Perjalanan laut 2-3 jam tergantung kondisi cuaca.",
    facilities: ["Dermaga sederhana"],
  },
  {
    id: "sm-pulau-kofiau",
    slug: "pulau-kofiau",
    name: "Suaka Margasatwa Pulau Kofiau",
    type: "SM",
    description:
      "Suaka margasatwa yang melindungi habitat Cenderawasih Kofiau (Cicinnurus respublica), burung endemik yang hanya ditemukan di pulau ini dan Pulau Gag.",
    location: { lat: -1.08, lng: 129.85, regency: "Kab. Raja Ampat" },
    areaHectares: 18500,
    established: "1987",
    legalBasis: "SK Menteri Kehutanan No. 462/Kpts-II/1987",
    heroImage: "/placeholder/sm-kofiau-hero.jpg",
    gallery: ["/placeholder/sm-kofiau-1.jpg"],
    biodiversityHighlights: [
      "Cenderawasih Kofiau (Cicinnurus respublica)",
      "Kakatua Raja (Probosciger aterrimus)",
      "Hutan mangrove",
    ],
    accessInfo:
      "Akses melalui kapal dari Sorong ke Pulau Kofiau, perjalanan 6-8 jam. Akomodasi terbatas di kampung setempat.",
    facilities: ["Pos jaga", "Jalur pengamatan burung"],
  },
  {
    id: "sm-sidei-wibeso",
    slug: "sidei-wibeso",
    name: "Suaka Margasatwa Sidei Wibeso",
    type: "SM",
    description:
      "Kawasan suaka margasatwa dengan hutan rawa dan dataran rendah yang menjadi habitat penting bagi berbagai jenis burung air dan reptil.",
    location: { lat: -1.5, lng: 134.2, regency: "Kab. Teluk Wondama" },
    areaHectares: 8500,
    established: "1985",
    legalBasis: "SK Menteri Kehutanan No. 395/Kpts-II/1985",
    heroImage: "/placeholder/sm-sidei-hero.jpg",
    gallery: [],
    biodiversityHighlights: [
      "Burung air migran",
      "Buaya muara (Crocodylus porosus)",
      "Hutan bakau primer",
    ],
    accessInfo:
      "Akses melalui Manokwari kemudian perjalanan laut ke Teluk Wondama. Diperlukan koordinasi dengan resort setempat.",
    facilities: ["Pos pengamatan"],
  },
  {
    id: "twa-sorong",
    slug: "twa-sorong",
    name: "Taman Wisata Alam Sorong",
    type: "TWA",
    description:
      "Hutan tropis dengan air terjun dan jalur trekking sepanjang 5km. Terletak di pinggiran Kota Sorong, menjadikannya kawasan konservasi paling mudah diakses di wilayah Papua Barat Daya.",
    location: { lat: -0.8833, lng: 131.25, regency: "Kota Sorong" },
    areaHectares: 945,
    established: "1993",
    legalBasis: "SK Menteri Kehutanan No. 575/Kpts-II/1993",
    heroImage: "/placeholder/twa-sorong-hero.jpg",
    gallery: ["/placeholder/twa-sorong-1.jpg", "/placeholder/twa-sorong-2.jpg"],
    biodiversityHighlights: [
      "Nuri Bayan (Eclectus roratus)",
      "Kuskus (Phalanger spp.)",
      "Anggrek hutan",
      "Kupu-kupu tropis",
    ],
    accessInfo:
      "15 menit berkendara dari pusat Kota Sorong. Jalan aspal hingga pintu masuk kawasan.",
    facilities: [
      "Jalur trekking",
      "Shelter",
      "Toilet umum",
      "Area parkir",
      "Pusat informasi",
    ],
  },
  {
    id: "twa-klamono",
    slug: "twa-klamono",
    name: "Taman Wisata Alam Klamono",
    type: "TWA",
    description:
      "Danau alami dikelilingi hutan tropis, habitat burung air dan reptil endemik. Danau ini juga memiliki fenomena minyak bumi yang muncul ke permukaan secara alami.",
    location: { lat: -1.1167, lng: 131.3333, regency: "Kab. Sorong" },
    areaHectares: 520,
    established: "1993",
    legalBasis: "SK Menteri Kehutanan No. 576/Kpts-II/1993",
    heroImage: "/placeholder/twa-klamono-hero.jpg",
    gallery: [],
    biodiversityHighlights: [
      "Burung air (kingfisher, heron)",
      "Biawak (Varanus spp.)",
      "Fenomena minyak alami",
    ],
    accessInfo:
      "45 menit berkendara dari Kota Sorong melalui jalan kabupaten. Jalan beraspal sebagian.",
    facilities: ["Area piknik", "Shelter", "Dermaga"],
  },
  {
    id: "twa-gunung-meja",
    slug: "twa-gunung-meja",
    name: "Taman Wisata Alam Gunung Meja",
    type: "TWA",
    description:
      "Area konservasi perkotaan dengan hutan hujan dataran rendah dan keanekaragaman anggrek. Terletak di jantung Kota Manokwari, menjadi paru-paru kota dan laboratorium alam bagi mahasiswa UNIPA.",
    location: { lat: -0.87, lng: 134.08, regency: "Kota Manokwari" },
    areaHectares: 462,
    established: "1993",
    legalBasis: "SK Menteri Kehutanan No. 574/Kpts-II/1993",
    heroImage: "/placeholder/twa-gunung-meja-hero.jpg",
    gallery: ["/placeholder/twa-gunung-meja-1.jpg"],
    biodiversityHighlights: [
      "90+ jenis anggrek",
      "Matoa (Pometia pinnata)",
      "Burung Maleo (Aepypodius arfakianus)",
    ],
    accessInfo:
      "10 menit dari pusat Kota Manokwari. Akses langsung dari jalan utama.",
    facilities: [
      "Jalur trekking",
      "Menara pandang",
      "Pusat informasi",
      "Area parkir",
    ],
  },
  {
    id: "tb-enarotali",
    slug: "taman-buru-enarotali",
    name: "Taman Buru Enarotali",
    type: "TB",
    description:
      "Kawasan taman buru yang terletak di dataran tinggi dengan ekosistem pegunungan yang unik. Dikelola untuk kegiatan berburu terkontrol dan konservasi satwa liar.",
    location: { lat: -3.95, lng: 136.3, regency: "Kab. Paniai" },
    areaHectares: 300000,
    established: "1980",
    legalBasis: "SK Menteri Pertanian No. 567/Kpts/Um/8/1980",
    heroImage: "/placeholder/tb-enarotali-hero.jpg",
    gallery: [],
    biodiversityHighlights: [
      "Rusa Timor (Rusa timorensis)",
      "Wallabi (Dorcopsis spp.)",
      "Ekosistem padang rumput sub-alpine",
    ],
    accessInfo:
      "Akses melalui penerbangan perintis ke Enarotali dari Nabire atau Timika. Infrastruktur jalan terbatas.",
    facilities: ["Pos jaga", "Base camp"],
  },
];

export function getAreaBySlug(slug: string): ConservationArea | undefined {
  return CONSERVATION_AREAS.find((area) => area.slug === slug);
}

export function getAreasByType(type: ConservationArea["type"]): ConservationArea[] {
  return CONSERVATION_AREAS.filter((area) => area.type === type);
}
