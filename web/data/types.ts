export type AreaType = "CA" | "SM" | "TWA" | "TB";

export const AREA_TYPE_LABELS: Record<AreaType, string> = {
  CA: "Cagar Alam",
  SM: "Suaka Margasatwa",
  TWA: "Taman Wisata Alam",
  TB: "Taman Buru",
};

export interface ConservationArea {
  id: string;
  slug: string;
  name: string;
  type: AreaType;
  description: string;
  location: { lat: number; lng: number; regency: string };
  areaHectares: number;
  established: string;
  legalBasis: string;
  heroImage: string;
  gallery: string[];
  biodiversityHighlights: string[];
  accessInfo: string;
  facilities: string[];
}

export type ProtectionStatus = "dilindungi" | "tidak_dilindungi";
export type TaxonClass =
  | "Aves"
  | "Mammalia"
  | "Reptilia"
  | "Amphibia"
  | "Insecta"
  | "Plantae";

export interface Species {
  id: string;
  slug: string;
  scientificName: string;
  localName: string;
  englishName: string;
  protectionStatus: ProtectionStatus;
  citesAppendix: string | null;
  taxonClass: TaxonClass;
  iucnStatus: string;
  description: string;
  habitat: string;
  distribution: string;
  heroImage: string;
  gallery: string[];
  type: "flora" | "fauna";
}

export interface NewsCategory {
  slug: string;
  name: string;
  description: string;
}

export type ArticleStatus = "draft" | "published" | "archived";

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: { name: string; avatar: string };
  publishedAt: string;
  featuredImage: string;
  readingTime: number;
  status: ArticleStatus;
}

export interface IncidentType {
  id: string;
  label: string;
  icon: string;
  color: "warning" | "danger" | "info";
}

export type UrgencyLevel = "darurat" | "segera" | "normal";

export interface SLATarget {
  responseHours: number;
  resolutionHours: number;
}

export type IncidentStatus =
  | "dilaporkan"
  | "ditinjau"
  | "ditindaklanjuti"
  | "selesai";

export const INCIDENT_STATUS_LABELS: Record<IncidentStatus, string> = {
  dilaporkan: "Dilaporkan",
  ditinjau: "Ditinjau",
  ditindaklanjuti: "Ditindaklanjuti",
  selesai: "Selesai",
};

export interface RecentIncident {
  id: string;
  type: string;
  summary: string;
  location: string;
  status: IncidentStatus;
  reportedAt: string;
  resolvedAt?: string;
}

export interface TourismPackage {
  id: string;
  name: string;
  price: number;
  currency: string;
  unit: string;
  maxQty: number;
  maxGroupSize?: number;
}

export interface EcoTourismArea {
  slug: string;
  name: string;
  description: string;
  location: { lat: number; lng: number; regency: string };
  heroImage: string;
  gallery: string[];
  facilities: string[];
  rules: string[];
  packages: TourismPackage[];
  operatingHours: string;
  closedDays: string[];
  rating: number;
  reviewCount: number;
}

export interface FAQCategory {
  slug: string;
  name: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export type RegulationStatus = "berlaku" | "dicabut";

export interface Regulation {
  slug: string;
  title: string;
  shortTitle: string;
  type: string;
  number: string;
  year: number;
  description: string;
  relevance: string;
  downloadUrl: string;
  status: RegulationStatus;
}

export interface OrganizationMember {
  name: string;
  position: string;
  photo: string;
}

export interface OrganizationDivision {
  name: string;
  description: string;
  head: string;
}

export interface OrganizationInfo {
  name: string;
  fullName: string;
  description: string;
  vision: string;
  missions: string[];
  history: string;
  address: string;
  phone: string;
  fax: string;
  email: string;
  website: string;
  workingArea: {
    provinces: string[];
    totalAreas: number;
    totalHectares: number;
    description: string;
  };
  leadership: OrganizationMember[];
  divisions: OrganizationDivision[];
}

export type ApplicantType =
  | "peneliti"
  | "mahasiswa"
  | "wartawan"
  | "wisatawan"
  | "lainnya";

export const APPLICANT_TYPE_LABELS: Record<ApplicantType, string> = {
  peneliti: "Peneliti",
  mahasiswa: "Mahasiswa",
  wartawan: "Wartawan / Media",
  wisatawan: "Wisatawan / Pengunjung",
  lainnya: "Lainnya",
};

export type SimaksiStatus =
  | "diterima"
  | "ditinjau"
  | "verifikasi_dokumen"
  | "disetujui"
  | "ditolak";

export const SIMAKSI_STATUS_LABELS: Record<SimaksiStatus, string> = {
  diterima: "Diterima",
  ditinjau: "Ditinjau",
  verifikasi_dokumen: "Verifikasi Dokumen",
  disetujui: "Disetujui",
  ditolak: "Ditolak",
};

export type PermitType = "penangkaran" | "peredaran" | "pengangkutan";

export const PERMIT_TYPE_LABELS: Record<PermitType, string> = {
  penangkaran: "Izin Penangkaran",
  peredaran: "Izin Peredaran",
  pengangkutan: "Izin Pengangkutan",
};

export type EntityType = "individu" | "perusahaan";

export type PermitPurpose = "komersial" | "ilmiah" | "edukasi" | "konservasi";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  pending: "Menunggu Pembayaran",
  confirmed: "Dikonfirmasi",
  cancelled: "Dibatalkan",
  completed: "Selesai",
};

export interface Statistic {
  label: string;
  value: number;
  suffix: string;
}
