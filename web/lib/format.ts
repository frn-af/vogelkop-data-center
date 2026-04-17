import { format, formatDistanceToNow, parseISO } from "date-fns";
import { id } from "date-fns/locale";

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), "d MMMM yyyy", { locale: id });
}

export function formatDateTime(dateStr: string): string {
  return format(parseISO(dateStr), "d MMMM yyyy, HH:mm 'WIT'", { locale: id });
}

export function formatRelativeTime(dateStr: string): string {
  return formatDistanceToNow(parseISO(dateStr), { addSuffix: true, locale: id });
}

export function formatCurrency(amount: number, currency = "IDR"): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("id-ID").format(num);
}

export function formatHectares(hectares: number): string {
  if (hectares >= 1_000_000) {
    return `${(hectares / 1_000_000).toFixed(1)} juta ha`;
  }
  if (hectares >= 1000) {
    return `${formatNumber(hectares)} ha`;
  }
  return `${hectares} ha`;
}

export function formatCoordinate(lat: number, lng: number): string {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}°${latDir}, ${Math.abs(lng).toFixed(4)}°${lngDir}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }
  return `${bytes} B`;
}

export function generateTrackingId(prefix: string): string {
  const now = new Date();
  const datePart = format(now, "yyyyMMdd");
  const randomPart = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${prefix}-${datePart}-${randomPart}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
