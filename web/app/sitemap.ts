import type { MetadataRoute } from "next";
import { CONSERVATION_AREAS } from "@/data/areas";
import { SAMPLE_ARTICLES } from "@/data/news";
import { SPECIES_DATABASE } from "@/data/species";
import { REGULATIONS } from "@/data/regulations";
import { NEWS_CATEGORIES } from "@/data/news";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/layanan`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/layanan/simaksi`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/layanan/simaksi/ajukan`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/layanan/simaksi/lacak`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/layanan/perizinan-flora-fauna`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/layanan/perizinan-flora-fauna/penangkaran`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/layanan/perizinan-flora-fauna/peredaran`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/layanan/perizinan-flora-fauna/pengangkutan`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/layanan/laporan-insiden`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/layanan/laporan-insiden/buat`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/layanan/laporan-insiden/lacak`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/layanan/tiket-wisata`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/layanan/tiket-wisata/pesanan`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/layanan/lacak`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/profil/tentang-kami`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/profil/visi-misi`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/profil/struktur-organisasi`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/profil/wilayah-kerja`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/profil/kontak`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/kawasan`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/kawasan/peta`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/berita`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/galeri`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/galeri/fauna`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/galeri/flora`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/edukasi/program-konservasi`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/edukasi/unduh`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/edukasi/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/regulasi`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/regulasi/unduh`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const areaPages: MetadataRoute.Sitemap = CONSERVATION_AREAS.map((area) => ({
    url: `${SITE_URL}/kawasan/${area.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = SAMPLE_ARTICLES
    .filter((a) => a.status === "published")
    .map((article) => ({
      url: `${SITE_URL}/berita/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }));

  const categoryPages: MetadataRoute.Sitemap = NEWS_CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/berita/kategori/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const speciesPages: MetadataRoute.Sitemap = SPECIES_DATABASE.map((species) => ({
    url: `${SITE_URL}/galeri/${species.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const regulationPages: MetadataRoute.Sitemap = REGULATIONS.map((reg) => ({
    url: `${SITE_URL}/regulasi/${reg.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...areaPages,
    ...articlePages,
    ...categoryPages,
    ...speciesPages,
    ...regulationPages,
  ];
}
