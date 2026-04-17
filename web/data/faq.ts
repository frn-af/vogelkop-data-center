import type { FAQCategory, FAQItem } from "./types";

export const FAQ_CATEGORIES: FAQCategory[] = [
  { slug: "perizinan", name: "Perizinan" },
  { slug: "kunjungan", name: "Kunjungan Kawasan" },
  { slug: "pelaporan", name: "Pelaporan Insiden" },
  { slug: "umum", name: "Umum" },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Apa itu SIMAKSI dan siapa yang membutuhkannya?",
    answer:
      "SIMAKSI (Surat Izin Masuk Kawasan Konservasi) adalah izin resmi yang diperlukan setiap orang yang akan memasuki kawasan konservasi. Ini termasuk peneliti, mahasiswa, wartawan, wisatawan, dan pihak lain yang memiliki kepentingan di dalam kawasan. SIMAKSI dapat diajukan secara online melalui portal layanan kami.",
    category: "perizinan",
  },
  {
    id: "faq-2",
    question: "Berapa lama proses pengurusan SIMAKSI?",
    answer:
      "Proses pengurusan SIMAKSI memakan waktu maksimal 5 hari kerja setelah berkas dinyatakan lengkap. Anda dapat memantau status permohonan secara real-time melalui fitur lacak permohonan dengan menggunakan nomor tiket yang diberikan saat pengajuan.",
    category: "perizinan",
  },
  {
    id: "faq-3",
    question: "Dokumen apa saja yang diperlukan untuk mengajukan izin penangkaran?",
    answer:
      "Untuk izin penangkaran, Anda memerlukan: (1) KTP/Identitas pemohon, (2) NPWP dan NIB jika atas nama badan usaha, (3) Proposal teknis penangkaran, (4) Foto fasilitas penangkaran, (5) Surat rekomendasi dari dinas terkait, (6) Sertifikat kompetensi tenaga medis hewan. Detail lengkap tersedia di halaman perizinan flora & fauna.",
    category: "perizinan",
  },
  {
    id: "faq-4",
    question: "Bagaimana cara memesan tiket masuk TWA secara online?",
    answer:
      "Kunjungi halaman Tiket Wisata, pilih TWA tujuan, tentukan tanggal kunjungan dan jumlah pengunjung, kemudian lakukan pembayaran. E-tiket berupa QR code akan dikirim ke email Anda dan dapat diunduh langsung dari portal. Tunjukkan QR code di pintu masuk kawasan.",
    category: "kunjungan",
  },
  {
    id: "faq-5",
    question: "Apakah ada batasan jumlah pengunjung per hari?",
    answer:
      "Ya, setiap TWA memiliki kapasitas daya dukung yang berbeda. Batas pengunjung per hari ditentukan berdasarkan daya dukung lingkungan kawasan. Informasi ketersediaan dapat dilihat saat proses pemesanan tiket. Kami menyarankan pemesanan H-3 terutama di akhir pekan dan libur nasional.",
    category: "kunjungan",
  },
  {
    id: "faq-6",
    question: "Fasilitas apa saja yang tersedia di Taman Wisata Alam?",
    answer:
      "Setiap TWA memiliki fasilitas berbeda. Umumnya tersedia: jalur trekking, shelter/gazebo, toilet umum, area parkir, dan pusat informasi. Beberapa TWA juga memiliki menara pandang dan area piknik. Detail fasilitas per kawasan dapat dilihat di halaman masing-masing TWA.",
    category: "kunjungan",
  },
  {
    id: "faq-7",
    question: "Bagaimana cara melaporkan konflik satwa liar?",
    answer:
      "Anda dapat melaporkan melalui portal layanan kami di halaman Lapor Insiden. Pilih jenis insiden, tandai lokasi di peta, unggah bukti foto jika ada, dan isi deskripsi kejadian. Laporan darurat (mengancam jiwa) akan ditanggapi dalam 2 jam. Anda juga dapat menghubungi hotline kami di (0951) 321-456.",
    category: "pelaporan",
  },
  {
    id: "faq-8",
    question: "Apakah laporan insiden bisa dilakukan secara anonim?",
    answer:
      "Ya, nama pelapor bersifat opsional. Namun, nomor telepon tetap diperlukan agar tim kami dapat melakukan konfirmasi dan tindak lanjut, terutama untuk laporan darurat. Identitas pelapor dijamin kerahasiaannya sesuai ketentuan yang berlaku.",
    category: "pelaporan",
  },
  {
    id: "faq-9",
    question: "Apa saja kawasan konservasi yang dikelola BBKSDA Papua Barat Daya?",
    answer:
      "BBKSDA Papua Barat Daya mengelola lebih dari 27 unit kawasan konservasi yang meliputi Cagar Alam (CA), Suaka Margasatwa (SM), Taman Wisata Alam (TWA), dan Taman Buru (TB). Kawasan ini tersebar di Semenanjung Kepala Burung (Vogelkop) dan sekitarnya. Daftar lengkap dan peta interaktif tersedia di halaman Kawasan Konservasi.",
    category: "umum",
  },
  {
    id: "faq-10",
    question: "Bagaimana cara menghubungi BBKSDA Papua Barat Daya?",
    answer:
      "Anda dapat menghubungi kami melalui: Telepon (0951) 321-456, Email info@bbksda-pbd.go.id, atau kunjungi kantor kami di Jl. Basuki Rahmat, Kota Sorong, Papua Barat Daya 98416. Jam layanan: Senin-Jumat, 08:00-16:00 WIT.",
    category: "umum",
  },
];

export function getFAQByCategory(categorySlug: string): FAQItem[] {
  return FAQ_ITEMS.filter((item) => item.category === categorySlug);
}
