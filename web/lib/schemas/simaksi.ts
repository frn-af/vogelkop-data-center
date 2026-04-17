import { z } from "zod/v4";

export const simaksiStep1Schema = z.object({
  applicantType: z.enum(["peneliti", "mahasiswa", "wartawan", "wisatawan", "lainnya"]),
  otherType: z.string().optional(),
});

export const simaksiStep2Schema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  idNumber: z.string().min(6, "Nomor identitas tidak valid"),
  institution: z.string().min(2, "Nama institusi/afiliasi wajib diisi"),
  email: z.email("Format email tidak valid"),
  phone: z.string().min(8, "Nomor telepon minimal 8 digit"),
  nationality: z.string().min(2, "Kewarganegaraan wajib diisi"),
});

export const simaksiStep3Schema = z.object({
  targetArea: z.string().min(1, "Pilih kawasan tujuan"),
  purposeCategory: z.string().min(1, "Pilih kategori tujuan"),
  purposeDetail: z.string().min(10, "Jelaskan tujuan kunjungan (minimal 10 karakter)"),
  entryDate: z.string().min(1, "Tanggal masuk wajib diisi"),
  exitDate: z.string().min(1, "Tanggal keluar wajib diisi"),
  teamSize: z.number().min(1, "Minimal 1 orang").max(50, "Maksimal 50 orang"),
  equipmentDeclaration: z.string().optional(),
});

export const simaksiStep5Schema = z.object({
  agreeTerms: z.literal(true, "Anda harus menyetujui syarat dan ketentuan"),
});

export type SimaksiStep1 = z.infer<typeof simaksiStep1Schema>;
export type SimaksiStep2 = z.infer<typeof simaksiStep2Schema>;
export type SimaksiStep3 = z.infer<typeof simaksiStep3Schema>;
export type SimaksiStep5 = z.infer<typeof simaksiStep5Schema>;

export const simaksiFullSchema = simaksiStep1Schema
  .merge(simaksiStep2Schema)
  .merge(simaksiStep3Schema)
  .merge(simaksiStep5Schema);

export type SimaksiFormData = z.infer<typeof simaksiFullSchema>;
