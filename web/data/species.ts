import type { Species } from "./types";

export const SPECIES_DATABASE: Species[] = [
  {
    id: "paradisaea-rubra",
    slug: "cenderawasih-merah",
    scientificName: "Paradisaea rubra",
    localName: "Cenderawasih Merah",
    englishName: "Red Bird-of-Paradise",
    protectionStatus: "dilindungi",
    citesAppendix: "II",
    taxonClass: "Aves",
    iucnStatus: "Near Threatened",
    description:
      "Burung cenderawasih dengan bulu merah menyala pada ekor panjangnya. Jantan melakukan tarian kawin yang spektakuler di dahan pohon tinggi untuk menarik perhatian betina. Merupakan ikon fauna Papua Barat Daya.",
    habitat:
      "Hutan hujan dataran rendah dan perbukitan hingga ketinggian 600 mdpl. Membutuhkan kanopi hutan yang utuh untuk tempat bersarang dan mencari makan.",
    distribution:
      "Endemik Kepulauan Raja Ampat, khususnya Pulau Waigeo dan Batanta.",
    heroImage: "/placeholder/species-cenderawasih-merah.jpg",
    gallery: ["/placeholder/species-cenderawasih-merah-1.jpg"],
    type: "fauna",
  },
  {
    id: "casuarius-casuarius",
    slug: "kasuari-gelambir-ganda",
    scientificName: "Casuarius casuarius",
    localName: "Kasuari Gelambir Ganda",
    englishName: "Southern Cassowary",
    protectionStatus: "dilindungi",
    citesAppendix: "II",
    taxonClass: "Aves",
    iucnStatus: "Least Concern",
    description:
      "Burung besar tak bisa terbang dengan tinggi hingga 1,8 meter dan berat hingga 60 kg. Memiliki tanduk keratin di kepala dan gelambir berwarna biru-merah di leher. Berperan penting dalam penyebaran biji pohon hutan.",
    habitat:
      "Hutan hujan tropis dataran rendah, hutan rawa, dan tepian sungai. Membutuhkan area jelajah yang luas.",
    distribution:
      "Papua Nugini, Papua Barat Daya, dan ujung utara Queensland, Australia.",
    heroImage: "/placeholder/species-kasuari.jpg",
    gallery: ["/placeholder/species-kasuari-1.jpg"],
    type: "fauna",
  },
  {
    id: "chelodina-reimanni",
    slug: "kura-kura-reimann",
    scientificName: "Chelodina reimanni",
    localName: "Kura-kura Reimann",
    englishName: "Reimann's Snake-necked Turtle",
    protectionStatus: "dilindungi",
    citesAppendix: "II",
    taxonClass: "Reptilia",
    iucnStatus: "Data Deficient",
    description:
      "Kura-kura air tawar berleher panjang yang merupakan salah satu spesies endemik Papua. Lehernya yang panjang digunakan untuk menangkap ikan dan invertebrata akuatik secara cepat.",
    habitat:
      "Sungai berarus lambat, rawa-rawa, dan danau di dataran rendah. Membutuhkan vegetasi air yang lebat.",
    distribution: "Endemik Papua bagian selatan dan tenggara.",
    heroImage: "/placeholder/species-kura-kura-reimann.jpg",
    gallery: [],
    type: "fauna",
  },
  {
    id: "varanus-prasinus",
    slug: "biawak-hijau",
    scientificName: "Varanus prasinus",
    localName: "Biawak Hijau",
    englishName: "Emerald Tree Monitor",
    protectionStatus: "dilindungi",
    citesAppendix: "II",
    taxonClass: "Reptilia",
    iucnStatus: "Least Concern",
    description:
      "Biawak arboreal berwarna hijau zamrud yang menghabiskan sebagian besar hidupnya di kanopi pohon. Ekornya yang prehensil membantu dalam memanjat. Salah satu biawak terindah di dunia.",
    habitat:
      "Kanopi hutan hujan tropis dan hutan mangrove. Bersifat arboreal dan jarang turun ke tanah.",
    distribution:
      "Papua, Papua Nugini, dan beberapa pulau di Maluku.",
    heroImage: "/placeholder/species-biawak-hijau.jpg",
    gallery: ["/placeholder/species-biawak-hijau-1.jpg"],
    type: "fauna",
  },
  {
    id: "dendrobium-spectabile",
    slug: "anggrek-tanduk-rusa",
    scientificName: "Dendrobium spectabile",
    localName: "Anggrek Tanduk Rusa",
    englishName: "Spectacular Dendrobium",
    protectionStatus: "dilindungi",
    citesAppendix: "II",
    taxonClass: "Plantae",
    iucnStatus: "Vulnerable",
    description:
      "Anggrek epifit berukuran besar dengan bunga yang menyerupai tanduk rusa. Setiap tangkai bunga dapat menghasilkan 20-50 kuntum bunga berwarna putih-krem dengan bercak ungu. Merupakan salah satu anggrek Papua paling dicari kolektor.",
    habitat:
      "Epifit pada pohon-pohon besar di hutan hujan dataran rendah hingga ketinggian 400 mdpl.",
    distribution: "Papua, Papua Nugini, dan Kepulauan Solomon.",
    heroImage: "/placeholder/species-anggrek-tanduk-rusa.jpg",
    gallery: [],
    type: "flora",
  },
  {
    id: "pteropus-neohibernicus",
    slug: "kalong-papua",
    scientificName: "Pteropus neohibernicus",
    localName: "Kalong Papua",
    englishName: "Great Flying Fox",
    protectionStatus: "tidak_dilindungi",
    citesAppendix: null,
    taxonClass: "Mammalia",
    iucnStatus: "Least Concern",
    description:
      "Kelelawar pemakan buah terbesar di Papua dengan rentang sayap hingga 1,5 meter. Hidup berkoloni besar di tajuk pohon dan berperan penting sebagai penyerbuk dan penyebar biji tanaman hutan.",
    habitat:
      "Hutan hujan tropis dataran rendah, kebun buah, dan mangrove. Bertengger di koloni besar pada pohon-pohon tinggi.",
    distribution:
      "Papua, Papua Nugini, dan kepulauan Bismarck.",
    heroImage: "/placeholder/species-kalong-papua.jpg",
    gallery: [],
    type: "fauna",
  },
  {
    id: "myrmecodia-tuberosa",
    slug: "sarang-semut",
    scientificName: "Myrmecodia tuberosa",
    localName: "Sarang Semut",
    englishName: "Ant Plant",
    protectionStatus: "tidak_dilindungi",
    citesAppendix: null,
    taxonClass: "Plantae",
    iucnStatus: "Least Concern",
    description:
      "Tumbuhan epifit unik yang memiliki hubungan simbiosis mutualisme dengan semut. Umbi yang membengkak menyediakan ruang bagi semut untuk bersarang, sementara semut memberikan nutrisi bagi tanaman. Digunakan dalam pengobatan tradisional Papua.",
    habitat:
      "Epifit pada pohon di hutan hujan dataran rendah dan hutan mangrove.",
    distribution: "Papua, Australia utara, dan Asia Tenggara.",
    heroImage: "/placeholder/species-sarang-semut.jpg",
    gallery: [],
    type: "flora",
  },
  {
    id: "dendrolagus-ursinus",
    slug: "kanguru-pohon-vogelkop",
    scientificName: "Dendrolagus ursinus",
    localName: "Kanguru Pohon Vogelkop",
    englishName: "Vogelkop Tree-kangaroo",
    protectionStatus: "dilindungi",
    citesAppendix: "II",
    taxonClass: "Mammalia",
    iucnStatus: "Vulnerable",
    description:
      "Kanguru pohon endemik Semenanjung Kepala Burung (Vogelkop). Hidup di kanopi hutan pegunungan dan merupakan lambang keanekaragaman hayati unik wilayah ini. Populasinya menurun akibat perburuan dan hilangnya habitat.",
    habitat:
      "Hutan hujan pegunungan pada ketinggian 1.000-3.000 mdpl. Bersifat arboreal dan nokturnal.",
    distribution:
      "Endemik Semenanjung Kepala Burung, Papua Barat Daya.",
    heroImage: "/placeholder/species-kanguru-pohon.jpg",
    gallery: ["/placeholder/species-kanguru-pohon-1.jpg"],
    type: "fauna",
  },
];

export function getSpeciesBySlug(slug: string): Species | undefined {
  return SPECIES_DATABASE.find((species) => species.slug === slug);
}

export function getSpeciesByType(type: "flora" | "fauna"): Species[] {
  return SPECIES_DATABASE.filter((species) => species.type === type);
}

export function getSpeciesByTaxon(taxonClass: Species["taxonClass"]): Species[] {
  return SPECIES_DATABASE.filter((species) => species.taxonClass === taxonClass);
}

export function searchSpecies(query: string): Species[] {
  const q = query.toLowerCase();
  return SPECIES_DATABASE.filter(
    (s) =>
      s.scientificName.toLowerCase().includes(q) ||
      s.localName.toLowerCase().includes(q) ||
      s.englishName.toLowerCase().includes(q)
  );
}
