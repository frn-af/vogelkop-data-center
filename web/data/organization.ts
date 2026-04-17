import type { OrganizationInfo, Statistic } from "./types";

export const ORGANIZATION: OrganizationInfo = {
  name: "BBKSDA Papua Barat Daya",
  fullName: "Balai Besar Konservasi Sumber Daya Alam Papua Barat Daya",
  description:
    "Unit Pelaksana Teknis Direktorat Jenderal Konservasi Sumber Daya Alam dan Ekosistem (KSDAE), Kementerian Lingkungan Hidup dan Kehutanan (KLHK), yang bertugas mengelola kawasan konservasi dan melindungi keanekaragaman hayati di wilayah Provinsi Papua Barat Daya.",
  vision:
    "Terwujudnya kelestarian sumber daya alam hayati dan ekosistemnya di wilayah Papua Barat Daya yang memberikan manfaat bagi kesejahteraan masyarakat.",
  missions: [
    "Mengelola kawasan konservasi secara efektif dan berkelanjutan",
    "Melindungi dan melestarikan spesies flora dan fauna endemik Papua",
    "Meningkatkan pelayanan publik berbasis digital dan transparan",
    "Memberdayakan masyarakat lokal dan adat dalam upaya konservasi",
    "Mengembangkan ekowisata yang bertanggung jawab dan bernilai ekonomi",
    "Menegakkan hukum dan mencegah perusakan sumber daya alam",
  ],
  history:
    "BBKSDA Papua Barat Daya dibentuk sebagai respons terhadap pemekaran Provinsi Papua Barat Daya berdasarkan UU No. 29 Tahun 2022. Sebelumnya, pengelolaan kawasan konservasi di wilayah ini berada di bawah BBKSDA Papua Barat. Dengan wilayah kerja yang mencakup Semenanjung Kepala Burung (Vogelkop) — salah satu kawasan dengan keanekaragaman hayati tertinggi di dunia — BBKSDA PBD memiliki tanggung jawab besar dalam melindungi warisan alam global.",
  address: "Jl. Basuki Rahmat, Kota Sorong, Papua Barat Daya 98416",
  phone: "(0951) 321-456",
  fax: "(0951) 321-457",
  email: "info@bbksda-pbd.go.id",
  website: "https://bbksda-pbd.go.id",
  workingArea: {
    provinces: ["Papua Barat Daya"],
    totalAreas: 27,
    totalHectares: 1650000,
    description:
      "Wilayah kerja mencakup seluruh Provinsi Papua Barat Daya meliputi Kota Sorong, Kab. Sorong, Kab. Sorong Selatan, Kab. Raja Ampat, Kab. Tambrauw, Kab. Maybrat, dan Kab. Pegunungan Arfak. Termasuk di dalamnya Semenanjung Kepala Burung (Vogelkop) dan Kepulauan Raja Ampat.",
  },
  leadership: [
    {
      name: "Dr. Ir. Ahmad Suryadi, M.Si.",
      position: "Kepala Balai Besar",
      photo: "/placeholder/leadership-kepala.jpg",
    },
    {
      name: "Ir. Siti Nurhaliza, M.Sc.",
      position: "Kepala Bagian Tata Usaha",
      photo: "/placeholder/leadership-tu.jpg",
    },
    {
      name: "Ir. Yohanes Wambrauw, M.P.",
      position: "Kepala Bidang Teknis Konservasi",
      photo: "/placeholder/leadership-teknis.jpg",
    },
    {
      name: "Dra. Maria Rumbekwan, M.Hum.",
      position: "Kepala Bidang Pengelolaan Kawasan",
      photo: "/placeholder/leadership-kawasan.jpg",
    },
  ],
  divisions: [
    {
      name: "Bagian Tata Usaha",
      description: "Mengelola administrasi umum, kepegawaian, keuangan, dan perlengkapan",
      head: "Ir. Siti Nurhaliza, M.Sc.",
    },
    {
      name: "Bidang Teknis Konservasi",
      description: "Mengelola program konservasi spesies, penelitian, dan monitoring keanekaragaman hayati",
      head: "Ir. Yohanes Wambrauw, M.P.",
    },
    {
      name: "Bidang Pengelolaan Kawasan",
      description: "Mengelola kawasan konservasi, zonasi, patroli, dan penegakan hukum",
      head: "Dra. Maria Rumbekwan, M.Hum.",
    },
    {
      name: "Seksi Konservasi Wilayah I (Sorong)",
      description: "Mengelola kawasan konservasi di wilayah Sorong dan sekitarnya",
      head: "Ir. Budi Santoso",
    },
    {
      name: "Seksi Konservasi Wilayah II (Raja Ampat)",
      description: "Mengelola kawasan konservasi di Kepulauan Raja Ampat",
      head: "Ir. Titus Kamarea",
    },
    {
      name: "Seksi Konservasi Wilayah III (Manokwari)",
      description: "Mengelola kawasan konservasi di wilayah Manokwari dan Pegunungan Arfak",
      head: "Ir. Albertina Manufandu, M.Si.",
    },
  ],
};

export const STATISTICS: Statistic[] = [
  { label: "Kawasan Konservasi", value: 27, suffix: "+" },
  { label: "Hektar Dilindungi", value: 1650000, suffix: "" },
  { label: "Spesies Dilindungi", value: 50, suffix: "+" },
  { label: "SIMAKSI Diproses/Tahun", value: 350, suffix: "+" },
];

export const CONSERVATION_PROGRAMS = [
  {
    slug: "patroli-anti-perburuan",
    title: "Patroli Anti-Perburuan",
    description:
      "Operasi patroli rutin dan gabungan di kawasan konservasi dan zona penyangga untuk mencegah perburuan liar, pembalakan ilegal, dan perusakan habitat. Melibatkan kerjasama dengan TNI, Polri, dan masyarakat adat setempat.",
    status: "Aktif",
    startYear: 2023,
  },
  {
    slug: "rehabilitasi-satwa",
    title: "Rehabilitasi dan Pelepasliaran Satwa",
    description:
      "Program rehabilitasi satwa liar yang disita dari perdagangan ilegal atau diselamatkan dari konflik dengan manusia. Termasuk program penangkaran ex-situ untuk spesies terancam dan pelepasliaran ke habitat alami.",
    status: "Aktif",
    startYear: 2024,
  },
  {
    slug: "monitoring-keanekaragaman",
    title: "Monitoring Keanekaragaman Hayati",
    description:
      "Survey dan monitoring berkala populasi spesies kunci, termasuk Cenderawasih, Kasuari, dan Kanguru Pohon. Menggunakan metode kamera jebak, point count, dan transek garis. Data digunakan untuk evaluasi efektivitas pengelolaan kawasan.",
    status: "Aktif",
    startYear: 2022,
  },
  {
    slug: "pemberdayaan-masyarakat",
    title: "Pemberdayaan Masyarakat Adat",
    description:
      "Program peningkatan kapasitas dan pemberdayaan ekonomi masyarakat adat di sekitar kawasan konservasi. Termasuk pengembangan ekowisata berbasis masyarakat, pelatihan pemandu wisata alam, dan usaha ekonomi produktif ramah lingkungan.",
    status: "Aktif",
    startYear: 2024,
  },
];
