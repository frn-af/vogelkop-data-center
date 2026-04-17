import type { Regulation } from "./types";

export const REGULATIONS: Regulation[] = [
  {
    slug: "perpres-95-2018-spbe",
    title: "Peraturan Presiden Nomor 95 Tahun 2018 tentang Sistem Pemerintahan Berbasis Elektronik",
    shortTitle: "Perpres 95/2018 — SPBE",
    type: "Peraturan Presiden",
    number: "95",
    year: 2018,
    description:
      "Mengatur penyelenggaraan pemerintahan yang memanfaatkan teknologi informasi dan komunikasi untuk memberikan layanan kepada pengguna. Menjadi landasan hukum portal layanan digital BBKSDA PBD.",
    relevance: "Landasan hukum digitalisasi layanan publik dan interoperabilitas sistem",
    downloadUrl: "/placeholder/downloads/perpres-95-2018.pdf",
    status: "berlaku",
  },
  {
    slug: "uu-5-1990-ksdae",
    title: "Undang-Undang Nomor 5 Tahun 1990 tentang Konservasi Sumber Daya Alam Hayati dan Ekosistemnya",
    shortTitle: "UU 5/1990 — KSDAE",
    type: "Undang-Undang",
    number: "5",
    year: 1990,
    description:
      "Undang-undang pokok yang mengatur konservasi sumber daya alam hayati dan ekosistemnya di Indonesia. Menjadi dasar hukum pembentukan kawasan konservasi dan perlindungan satwa liar.",
    relevance: "Dasar hukum pengelolaan kawasan konservasi dan perlindungan spesies",
    downloadUrl: "/placeholder/downloads/uu-5-1990.pdf",
    status: "berlaku",
  },
  {
    slug: "uu-32-2024-ksdahe",
    title: "Undang-Undang Nomor 32 Tahun 2024 tentang Konservasi Sumber Daya Alam Hayati dan Ekosistemnya",
    shortTitle: "UU 32/2024 — KSDAHE (Pembaruan)",
    type: "Undang-Undang",
    number: "32",
    year: 2024,
    description:
      "Pembaruan UU 5/1990 yang menyesuaikan ketentuan konservasi dengan perkembangan terkini termasuk penguatan peran masyarakat adat, digitalisasi perizinan, dan penguatan penegakan hukum.",
    relevance: "Pembaruan regulasi konservasi — terminologi dan prosedur perizinan baru",
    downloadUrl: "/placeholder/downloads/uu-32-2024.pdf",
    status: "berlaku",
  },
  {
    slug: "pp-7-1999-flora-fauna",
    title: "Peraturan Pemerintah Nomor 7 Tahun 1999 tentang Pengawetan Jenis Tumbuhan dan Satwa",
    shortTitle: "PP 7/1999 — Flora Fauna",
    type: "Peraturan Pemerintah",
    number: "7",
    year: 1999,
    description:
      "Mengatur daftar jenis tumbuhan dan satwa yang dilindungi di Indonesia beserta ketentuan pengawetannya. Menjadi rujukan utama dalam klasifikasi status perlindungan spesies.",
    relevance: "Daftar spesies dilindungi — referensi dalam perizinan flora & fauna",
    downloadUrl: "/placeholder/downloads/pp-7-1999.pdf",
    status: "berlaku",
  },
  {
    slug: "pp-28-2011-kawasan-pelestarian",
    title: "Peraturan Pemerintah Nomor 28 Tahun 2011 tentang Pengelolaan Kawasan Suaka Alam dan Kawasan Pelestarian Alam",
    shortTitle: "PP 28/2011 — Pengelolaan Kawasan",
    type: "Peraturan Pemerintah",
    number: "28",
    year: 2011,
    description:
      "Mengatur tata cara pengelolaan kawasan suaka alam dan kawasan pelestarian alam termasuk zonasi, pemanfaatan, dan akses publik.",
    relevance: "Aturan zonasi, akses kawasan, dan perizinan masuk (SIMAKSI)",
    downloadUrl: "/placeholder/downloads/pp-28-2011.pdf",
    status: "berlaku",
  },
  {
    slug: "uu-41-1999-kehutanan",
    title: "Undang-Undang Nomor 41 Tahun 1999 tentang Kehutanan",
    shortTitle: "UU 41/1999 — Kehutanan",
    type: "Undang-Undang",
    number: "41",
    year: 1999,
    description:
      "Undang-undang pokok kehutanan yang menjadi kerangka hukum pengelolaan hutan di Indonesia termasuk hutan konservasi, hutan lindung, dan hutan produksi.",
    relevance: "Kerangka hukum pengelolaan hutan konservasi",
    downloadUrl: "/placeholder/downloads/uu-41-1999.pdf",
    status: "berlaku",
  },
  {
    slug: "uu-29-2022-papua-barat-daya",
    title: "Undang-Undang Nomor 29 Tahun 2022 tentang Pembentukan Provinsi Papua Barat Daya",
    shortTitle: "UU 29/2022 — Papua Barat Daya",
    type: "Undang-Undang",
    number: "29",
    year: 2022,
    description:
      "Undang-undang pembentukan Provinsi Papua Barat Daya sebagai pemekaran dari Provinsi Papua Barat. Menjadi dasar hukum wilayah kerja BBKSDA Papua Barat Daya.",
    relevance: "Dasar hukum pembentukan provinsi dan wilayah kerja BBKSDA PBD",
    downloadUrl: "/placeholder/downloads/uu-29-2022.pdf",
    status: "berlaku",
  },
];

export function getRegulationBySlug(slug: string): Regulation | undefined {
  return REGULATIONS.find((reg) => reg.slug === slug);
}
