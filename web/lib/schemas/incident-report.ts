import { z } from "zod/v4";

export const incidentStep1Schema = z.object({
  incidentType: z.string().min(1, "Pilih jenis insiden"),
  urgency: z.enum(["darurat", "segera", "normal"]),
  incidentDate: z.string().min(1, "Tanggal kejadian wajib diisi"),
  incidentTime: z.string().min(1, "Waktu kejadian wajib diisi"),
});

export const incidentStep2Schema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  nearestArea: z.string().optional(),
  province: z.string().optional(),
  regency: z.string().optional(),
  district: z.string().optional(),
  village: z.string().optional(),
});

export const incidentStep3Schema = z.object({
  description: z.string().min(50, "Deskripsi minimal 50 karakter"),
  animalsInvolved: z.number().optional(),
  speciesId: z.string().optional(),
  casualtyEstimate: z.string().optional(),
});

export const incidentStep4Schema = z.object({
  reporterName: z.string().optional(),
  reporterPhone: z.string().min(8, "Nomor telepon minimal 8 digit"),
  reporterEmail: z.string().optional(),
  preferredContact: z.enum(["phone", "email", "whatsapp"]),
});

export type IncidentStep1 = z.infer<typeof incidentStep1Schema>;
export type IncidentStep2 = z.infer<typeof incidentStep2Schema>;
export type IncidentStep3 = z.infer<typeof incidentStep3Schema>;
export type IncidentStep4 = z.infer<typeof incidentStep4Schema>;

export const incidentFullSchema = incidentStep1Schema
  .merge(incidentStep2Schema)
  .merge(incidentStep3Schema)
  .merge(incidentStep4Schema);

export type IncidentFormData = z.infer<typeof incidentFullSchema>;
