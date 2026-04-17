import type { IncidentType, SLATarget, UrgencyLevel, RecentIncident } from "./types";

export const INCIDENT_TYPES: IncidentType[] = [
  { id: "hwc", label: "Konflik Satwa Liar", icon: "ShieldAlert", color: "warning" },
  { id: "fire", label: "Kebakaran Hutan", icon: "Flame", color: "danger" },
  { id: "logging", label: "Pembalakan Liar", icon: "Axe", color: "danger" },
  { id: "poaching", label: "Perburuan Liar", icon: "Target", color: "danger" },
  { id: "other", label: "Lainnya", icon: "FileText", color: "info" },
];

export const SLA_TARGETS: Record<UrgencyLevel, SLATarget> = {
  darurat: { responseHours: 2, resolutionHours: 24 },
  segera: { responseHours: 24, resolutionHours: 72 },
  normal: { responseHours: 72, resolutionHours: 168 },
};

export const URGENCY_LABELS: Record<UrgencyLevel, string> = {
  darurat: "Darurat",
  segera: "Segera",
  normal: "Normal",
};

export const RECENT_INCIDENTS: RecentIncident[] = [
  {
    id: "INC-20260410-0012",
    type: "hwc",
    summary: "Buaya muara terlihat di sungai dekat pemukiman",
    location: "Kab. Sorong, Distrik Aimas",
    status: "selesai",
    reportedAt: "2026-04-10T08:30:00+09:00",
    resolvedAt: "2026-04-10T14:15:00+09:00",
  },
  {
    id: "INC-20260408-0007",
    type: "fire",
    summary: "Titik api terdeteksi di kawasan penyangga CA Tamrau",
    location: "Kab. Tambrauw, Distrik Fef",
    status: "ditindaklanjuti",
    reportedAt: "2026-04-08T14:00:00+09:00",
  },
  {
    id: "INC-20260405-0003",
    type: "poaching",
    summary: "Penemuan jerat satwa di area penyangga TWA Sorong",
    location: "Kota Sorong, Kel. Klasaman",
    status: "selesai",
    reportedAt: "2026-04-05T06:45:00+09:00",
    resolvedAt: "2026-04-07T16:00:00+09:00",
  },
  {
    id: "INC-20260401-0001",
    type: "hwc",
    summary: "Kasuari masuk ke kebun warga",
    location: "Kab. Tambrauw, Distrik Sausapor",
    status: "selesai",
    reportedAt: "2026-04-01T10:15:00+09:00",
    resolvedAt: "2026-04-01T15:30:00+09:00",
  },
];

export function getIncidentTypeById(id: string): IncidentType | undefined {
  return INCIDENT_TYPES.find((type) => type.id === id);
}
