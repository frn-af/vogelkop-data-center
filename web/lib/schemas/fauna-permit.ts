import { z } from "zod/v4";

export const faunaPermitStep1Schema = z.object({
  permitType: z.enum(["penangkaran", "peredaran", "pengangkutan"]),
  entityType: z.enum(["individu", "perusahaan"]),
  companyName: z.string().optional(),
  npwp: z.string().optional(),
  nib: z.string().optional(),
  applicantName: z.string().min(3, "Nama pemohon minimal 3 karakter"),
  idNumber: z.string().min(6, "Nomor identitas tidak valid"),
  address: z.string().min(10, "Alamat minimal 10 karakter"),
  contactPerson: z.string().min(3, "Nama kontak minimal 3 karakter"),
  email: z.email("Format email tidak valid"),
  phone: z.string().min(8, "Nomor telepon minimal 8 digit"),
});

export const faunaPermitStep2Schema = z.object({
  speciesId: z.string().min(1, "Pilih spesies"),
  speciesName: z.string().min(1, "Nama spesies wajib diisi"),
  quantity: z.number().min(1, "Jumlah minimal 1"),
  purpose: z.enum(["komersial", "ilmiah", "edukasi", "konservasi"]),
});

export const faunaPermitStep3PenangkaranSchema = z.object({
  facilityLocation: z.string().min(5, "Lokasi fasilitas wajib diisi"),
  facilityArea: z.string().min(1, "Luas fasilitas wajib diisi"),
  facilityCapacity: z.string().min(1, "Kapasitas fasilitas wajib diisi"),
  veterinarianName: z.string().min(3, "Nama dokter hewan wajib diisi"),
});

export const faunaPermitStep3PeredaranSchema = z.object({
  originFacility: z.string().min(3, "Fasilitas asal wajib diisi"),
  destination: z.string().min(3, "Tujuan distribusi wajib diisi"),
  quotaYear: z.string().min(4, "Tahun kuota wajib diisi"),
});

export const faunaPermitStep3PengangkutanSchema = z.object({
  originLocation: z.string().min(3, "Lokasi asal wajib diisi"),
  destinationLocation: z.string().min(3, "Lokasi tujuan wajib diisi"),
  transportRoute: z.string().min(5, "Rute pengangkutan wajib diisi"),
  transportMode: z.string().min(2, "Moda transportasi wajib diisi"),
});

export const faunaPermitStep5Schema = z.object({
  agreeTerms: z.literal(true, "Anda harus menyetujui syarat dan ketentuan"),
});

export type FaunaPermitStep1 = z.infer<typeof faunaPermitStep1Schema>;
export type FaunaPermitStep2 = z.infer<typeof faunaPermitStep2Schema>;
export type FaunaPermitStep3Penangkaran = z.infer<typeof faunaPermitStep3PenangkaranSchema>;
export type FaunaPermitStep3Peredaran = z.infer<typeof faunaPermitStep3PeredaranSchema>;
export type FaunaPermitStep3Pengangkutan = z.infer<typeof faunaPermitStep3PengangkutanSchema>;
export type FaunaPermitStep5 = z.infer<typeof faunaPermitStep5Schema>;
