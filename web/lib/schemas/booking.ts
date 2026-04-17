import { z } from "zod/v4";

export const bookingFormSchema = z.object({
  areaSlug: z.string().min(1, "Pilih kawasan wisata"),
  visitDate: z.string().min(1, "Tanggal kunjungan wajib diisi"),
  tickets: z
    .array(
      z.object({
        packageId: z.string(),
        quantity: z.number().min(0),
      })
    )
    .refine(
      (tickets) => tickets.some((t) => t.quantity > 0),
      "Pilih minimal 1 tiket"
    ),
  leadVisitorName: z.string().min(3, "Nama pengunjung utama minimal 3 karakter"),
  leadVisitorPhone: z.string().min(8, "Nomor telepon minimal 8 digit"),
  leadVisitorEmail: z.email("Format email tidak valid"),
  groupMembers: z.array(z.string()).optional(),
  specialRequirements: z.string().optional(),
  agreeTerms: z.literal(true, "Anda harus menyetujui syarat dan ketentuan"),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export const bookingLookupSchema = z.object({
  bookingId: z.string().optional(),
  email: z.string().optional(),
}).refine(
  (data) => data.bookingId || data.email,
  "Masukkan nomor booking atau email"
);

export type BookingLookupData = z.infer<typeof bookingLookupSchema>;
