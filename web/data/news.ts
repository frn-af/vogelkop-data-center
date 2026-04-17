import type { NewsCategory, NewsArticle } from "./types";

export const NEWS_CATEGORIES: NewsCategory[] = [
  { slug: "pengumuman", name: "Pengumuman", description: "Informasi resmi dan pemberitahuan publik" },
  { slug: "siaran-pers", name: "Siaran Pers", description: "Press releases resmi BBKSDA PBD" },
  { slug: "kegiatan-lapangan", name: "Kegiatan Lapangan", description: "Laporan kegiatan di kawasan konservasi" },
  { slug: "kisah-konservasi", name: "Kisah Sukses Konservasi", description: "Cerita keberhasilan program konservasi" },
  { slug: "edukasi", name: "Edukasi", description: "Konten edukatif untuk masyarakat" },
];

export const SAMPLE_ARTICLES: NewsArticle[] = [
  {
    slug: "pelepasliaran-kasuari-tambrauw-2026",
    title: "Pelepasliaran Kasuari di Kawasan Tambrauw Berhasil Dilakukan",
    excerpt:
      "Tim BBKSDA Papua Barat Daya berhasil melepasliarkan 3 ekor kasuari gelambir ganda (Casuarius casuarius) ke habitat alaminya di kawasan hutan Tambrauw setelah menjalani proses rehabilitasi selama 8 bulan.",
    content: `
Tim BBKSDA Papua Barat Daya berhasil melepasliarkan 3 ekor kasuari gelambir ganda (*Casuarius casuarius*) ke habitat alaminya di kawasan hutan Tambrauw setelah menjalani proses rehabilitasi selama 8 bulan.

Ketiga kasuari ini sebelumnya diselamatkan dari situasi konflik dengan masyarakat di sekitar kampung Sausapor pada Agustus 2025. Setelah menjalani perawatan intensif di pusat rehabilitasi satwa BBKSDA PBD di Sorong, ketiga individu dinyatakan sehat dan siap untuk kembali ke alam liar.

## Proses Rehabilitasi

Proses rehabilitasi melibatkan beberapa tahap:

1. **Pemeriksaan kesehatan** — Tim dokter hewan melakukan pemeriksaan menyeluruh termasuk tes darah dan parasit
2. **Adaptasi diet** — Kasuari dilatih kembali untuk mengonsumsi buah-buahan hutan alami
3. **Latihan survival** — Pengurangan kontak dengan manusia secara bertahap
4. **Pemasangan GPS tracker** — Untuk pemantauan pasca-pelepasliaran

Kepala BBKSDA Papua Barat Daya menyatakan bahwa keberhasilan ini merupakan bukti komitmen lembaga dalam melestarikan satwa liar endemik Papua.

> "Setiap individu kasuari yang berhasil kita kembalikan ke habitat alaminya adalah kemenangan bagi konservasi. Kami berterima kasih kepada masyarakat lokal yang turut berpartisipasi dalam upaya ini." — Kepala BBKSDA PBD

Tim pemantauan akan terus memantau pergerakan ketiga kasuari melalui GPS tracker selama minimal 12 bulan ke depan.
    `.trim(),
    category: "kisah-konservasi",
    tags: ["kasuari", "rewilding", "tambrauw"],
    author: { name: "Humas BBKSDA PBD", avatar: "/placeholder/avatar-humas.jpg" },
    publishedAt: "2026-04-10T09:00:00+09:00",
    featuredImage: "/placeholder/kasuari-release.jpg",
    readingTime: 5,
    status: "published",
  },
  {
    slug: "pengumuman-jam-operasional-lebaran-2026",
    title: "Pengumuman Jam Operasional TWA Selama Periode Lebaran 2026",
    excerpt:
      "Sehubungan dengan libur nasional Hari Raya Idul Fitri 1447 H, berikut informasi jam operasional Taman Wisata Alam yang dikelola BBKSDA Papua Barat Daya.",
    content: `
Sehubungan dengan libur nasional Hari Raya Idul Fitri 1447 H, berikut informasi jam operasional Taman Wisata Alam yang dikelola BBKSDA Papua Barat Daya selama periode 28 Maret — 7 April 2026.

## Jadwal Operasional

| TWA | Jam Operasional | Keterangan |
|---|---|---|
| TWA Sorong | 07:00 — 16:00 WIT | Buka setiap hari |
| TWA Gunung Meja | 07:00 — 15:00 WIT | Tutup tanggal 31 Maret |
| TWA Klamono | 07:00 — 16:00 WIT | Buka setiap hari |

## Ketentuan Khusus

- Kapasitas pengunjung dibatasi **50% dari kapasitas normal** untuk menjaga kenyamanan
- Pemesanan tiket online diutamakan melalui portal layanan
- Pengunjung wajib mematuhi protokol keselamatan kawasan

Untuk informasi lebih lanjut, hubungi Pusat Informasi BBKSDA PBD di (0951) 321-456 atau email info@bbksda-pbd.go.id.
    `.trim(),
    category: "pengumuman",
    tags: ["twa", "jam-operasional", "lebaran"],
    author: { name: "Humas BBKSDA PBD", avatar: "/placeholder/avatar-humas.jpg" },
    publishedAt: "2026-04-05T08:00:00+09:00",
    featuredImage: "/placeholder/twa-lebaran.jpg",
    readingTime: 2,
    status: "published",
  },
  {
    slug: "patroli-gabungan-anti-perburuan-raja-ampat",
    title: "Patroli Gabungan Anti-Perburuan Liar di Perairan Raja Ampat",
    excerpt:
      "BBKSDA PBD bersama TNI-AL dan Polairud melaksanakan patroli gabungan anti-perburuan liar di perairan kawasan konservasi Raja Ampat selama 5 hari.",
    content: `
BBKSDA Papua Barat Daya bersama TNI Angkatan Laut dan Kepolisian Perairan (Polairud) melaksanakan patroli gabungan anti-perburuan liar di perairan kawasan konservasi Raja Ampat selama 5 hari, 27-31 Maret 2026.

## Ruang Lingkup Operasi

Patroli dilakukan di wilayah perairan yang mencakup:

- **Suaka Margasatwa Pulau Kofiau** dan sekitarnya
- Perairan di sekitar Selat Dampier
- Zona penyangga kawasan konservasi laut

## Hasil Operasi

Selama operasi, tim gabungan berhasil:

1. Memeriksa **23 kapal** nelayan dan wisata
2. Melakukan sosialisasi regulasi kepada **5 kelompok nelayan** lokal
3. Memasang **8 papan peringatan** baru di titik-titik rawan

Tidak ditemukan aktivitas perburuan liar selama periode patroli, yang menunjukkan efektivitas pengawasan rutin dan kesadaran masyarakat yang meningkat.

Kegiatan patroli gabungan ini akan dilaksanakan secara rutin setiap kuartal sebagai bagian dari program penegakan hukum dan pengawasan kawasan konservasi.
    `.trim(),
    category: "kegiatan-lapangan",
    tags: ["patroli", "raja-ampat", "anti-perburuan"],
    author: { name: "Resort KK Raja Ampat", avatar: "/placeholder/avatar-resort.jpg" },
    publishedAt: "2026-04-01T10:30:00+09:00",
    featuredImage: "/placeholder/patroli-raja-ampat.jpg",
    readingTime: 4,
    status: "published",
  },
  {
    slug: "workshop-identifikasi-satwa-dilindungi-2026",
    title: "Workshop Identifikasi Satwa Dilindungi untuk Petugas Karantina",
    excerpt:
      "BBKSDA PBD menyelenggarakan workshop identifikasi satwa dilindungi bagi petugas karantina dan Bea Cukai di Bandara DEO Sorong.",
    content: `
BBKSDA Papua Barat Daya menyelenggarakan workshop identifikasi satwa dilindungi bagi petugas karantina pertanian dan Bea Cukai di Bandara Domine Eduard Osok (DEO) Sorong pada 20-21 Maret 2026.

Workshop ini bertujuan meningkatkan kapasitas petugas di garis depan dalam mengenali dan menangani temuan satwa dilindungi yang dicoba diselundupkan melalui jalur udara.

## Materi Workshop

- Pengenalan spesies dilindungi yang sering diperdagangkan ilegal
- Teknik identifikasi berdasarkan ciri morfologi
- Prosedur penanganan dan pelaporan temuan
- Regulasi terkait (PP 7/1999, UU 32/2024)

Sebanyak **35 peserta** dari berbagai instansi mengikuti workshop dua hari ini. Kegiatan ini merupakan bagian dari program kerjasama antar-lembaga dalam pemberantasan perdagangan satwa liar ilegal.
    `.trim(),
    category: "kegiatan-lapangan",
    tags: ["workshop", "identifikasi", "satwa-dilindungi", "bandara"],
    author: { name: "Humas BBKSDA PBD", avatar: "/placeholder/avatar-humas.jpg" },
    publishedAt: "2026-03-22T14:00:00+09:00",
    featuredImage: "/placeholder/workshop-identifikasi.jpg",
    readingTime: 3,
    status: "published",
  },
  {
    slug: "monitoring-populasi-cenderawasih-waigeo-2026",
    title: "Hasil Monitoring Populasi Cenderawasih Merah di Pulau Waigeo",
    excerpt:
      "Survey monitoring tahunan menunjukkan populasi Cenderawasih Merah (Paradisaea rubra) di Pulau Waigeo tetap stabil dengan estimasi 3.500-5.000 individu.",
    content: `
Hasil survey monitoring tahunan populasi Cenderawasih Merah (*Paradisaea rubra*) di Pulau Waigeo menunjukkan tren populasi yang stabil dengan estimasi **3.500-5.000 individu** pada periode survey Februari-Maret 2026.

## Metodologi

Tim monitoring yang terdiri dari staf BBKSDA PBD, peneliti LIPI, dan masyarakat lokal menggunakan metode:

- **Point count** di 45 titik sampling
- **Kamera jebak** di 20 lokasi lek (tempat tarian kawin)
- **Wawancara** dengan masyarakat adat setempat

## Temuan Utama

1. Ditemukan **12 lokasi lek aktif**, konsisten dengan survey tahun sebelumnya
2. Rasio jantan-betina seimbang di area lek
3. Ditemukan **3 lokasi lek baru** yang belum tercatat sebelumnya
4. Tidak ada indikasi perburuan aktif

## Rekomendasi

Tim monitoring merekomendasikan perluasan zona inti perlindungan di sekitar lokasi lek yang baru ditemukan dan peningkatan keterlibatan masyarakat adat dalam pengawasan harian.
    `.trim(),
    category: "kisah-konservasi",
    tags: ["cenderawasih", "monitoring", "waigeo", "raja-ampat"],
    author: { name: "Seksi Konservasi Wilayah II", avatar: "/placeholder/avatar-resort.jpg" },
    publishedAt: "2026-03-15T09:00:00+09:00",
    featuredImage: "/placeholder/cenderawasih-monitoring.jpg",
    readingTime: 6,
    status: "published",
  },
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return SAMPLE_ARTICLES.find((article) => article.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): NewsArticle[] {
  return SAMPLE_ARTICLES.filter(
    (article) => article.category === categorySlug && article.status === "published"
  );
}

export function getPublishedArticles(): NewsArticle[] {
  return SAMPLE_ARTICLES
    .filter((article) => article.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getCategoryBySlug(slug: string): NewsCategory | undefined {
  return NEWS_CATEGORIES.find((cat) => cat.slug === slug);
}
