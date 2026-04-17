"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { MultiStepWrapper } from "@/components/forms/multi-step-wrapper";
import { FileUpload } from "@/components/shared/file-upload";
import { CONSERVATION_AREAS } from "@/data/areas";
import { APPLICANT_TYPE_LABELS } from "@/data/types";
import type { ApplicantType } from "@/data/types";
import { generateTrackingId } from "@/lib/format";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const STEPS = ["Tipe Pemohon", "Data Diri", "Detail Kunjungan", "Dokumen", "Tinjau & Kirim"];

interface FormData {
  applicantType: ApplicantType | "";
  otherType: string;
  fullName: string;
  idNumber: string;
  institution: string;
  email: string;
  phone: string;
  nationality: string;
  targetArea: string;
  purposeCategory: string;
  purposeDetail: string;
  entryDate: string;
  exitDate: string;
  teamSize: number;
  equipmentDeclaration: string;
}

const initialData: FormData = {
  applicantType: "",
  otherType: "",
  fullName: "",
  idNumber: "",
  institution: "",
  email: "",
  phone: "",
  nationality: "Indonesia",
  targetArea: "",
  purposeCategory: "",
  purposeDetail: "",
  entryDate: "",
  exitDate: "",
  teamSize: 1,
  equipmentDeclaration: "",
};

export default function SimaksiAjukanPage() {
  const [step, setStep] = useState(1);
  const [data, setData, clearData] = useLocalStorage<FormData>("simaksi-form", initialData);
  const [files, setFiles] = useState<File[]>([]);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const router = useRouter();

  const update = useCallback(
    (partial: Partial<FormData>) => setData((prev) => ({ ...prev, ...partial })),
    [setData]
  );

  const handleSubmit = () => {
    const id = generateTrackingId("SIMAKSI");
    setTrackingId(id);
    setSubmitted(true);
    clearData();
    toast.success("Permohonan berhasil dikirim!");
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-[var(--padding-section-x)] py-8">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <Check className="size-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Permohonan Terkirim</h1>
            <p className="text-muted-foreground">
              Permohonan SIMAKSI Anda telah berhasil dikirim. Simpan nomor tiket berikut untuk melacak status.
            </p>
            <div className="rounded-lg border-2 border-primary/20 bg-primary/5 px-6 py-3">
              <p className="text-xs text-muted-foreground">Nomor Tiket</p>
              <p className="text-lg font-bold text-primary">{trackingId}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Estimasi waktu proses: 5 hari kerja
            </p>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => router.push("/layanan/simaksi/lacak")}>
                Lacak Status
              </Button>
              <Button onClick={() => router.push("/layanan")}>
                Kembali ke Layanan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Layanan Publik", href: "/layanan" },
          { label: "SIMAKSI", href: "/layanan/simaksi" },
          { label: "Ajukan Permohonan" },
        ]}
      />

      <h1 className="mt-8 text-2xl font-bold tracking-tight">
        Ajukan Permohonan SIMAKSI
      </h1>

      <div className="mt-8">
        <MultiStepWrapper steps={STEPS} currentStep={step}>
          {step === 1 && (
            <Card>
              <CardContent className="space-y-4 p-6">
                <div>
                  <Label>Tipe Pemohon</Label>
                  <Select
                    value={data.applicantType}
                    onValueChange={(v) => update({ applicantType: v as ApplicantType })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Pilih tipe pemohon" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(APPLICANT_TYPE_LABELS).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {data.applicantType === "lainnya" && (
                  <div>
                    <Label>Jelaskan Tipe Pemohon</Label>
                    <Input
                      className="mt-1.5"
                      value={data.otherType}
                      onChange={(e) => update({ otherType: e.target.value })}
                      placeholder="Kategori lainnya"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardContent className="space-y-4 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Nama Lengkap</Label>
                    <Input className="mt-1.5" value={data.fullName} onChange={(e) => update({ fullName: e.target.value })} />
                  </div>
                  <div>
                    <Label>No. KTP / Paspor</Label>
                    <Input className="mt-1.5" value={data.idNumber} onChange={(e) => update({ idNumber: e.target.value })} />
                  </div>
                  <div>
                    <Label>Institusi / Afiliasi</Label>
                    <Input className="mt-1.5" value={data.institution} onChange={(e) => update({ institution: e.target.value })} />
                  </div>
                  <div>
                    <Label>Kewarganegaraan</Label>
                    <Input className="mt-1.5" value={data.nationality} onChange={(e) => update({ nationality: e.target.value })} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input className="mt-1.5" type="email" value={data.email} onChange={(e) => update({ email: e.target.value })} />
                  </div>
                  <div>
                    <Label>Nomor Telepon</Label>
                    <Input className="mt-1.5" type="tel" value={data.phone} onChange={(e) => update({ phone: e.target.value })} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardContent className="space-y-4 p-6">
                <div>
                  <Label>Kawasan Tujuan</Label>
                  <Select value={data.targetArea} onValueChange={(v) => v && update({ targetArea: v })}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Pilih kawasan konservasi" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONSERVATION_AREAS.map((area) => (
                        <SelectItem key={area.id} value={area.id}>
                          {area.name} ({area.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Kategori Tujuan</Label>
                  <Select value={data.purposeCategory} onValueChange={(v) => v && update({ purposeCategory: v })}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="penelitian">Penelitian Ilmiah</SelectItem>
                      <SelectItem value="pendidikan">Pendidikan</SelectItem>
                      <SelectItem value="jurnalistik">Jurnalistik / Dokumentasi</SelectItem>
                      <SelectItem value="wisata">Wisata / Rekreasi</SelectItem>
                      <SelectItem value="lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Detail Tujuan Kunjungan</Label>
                  <Textarea className="mt-1.5" value={data.purposeDetail} onChange={(e) => update({ purposeDetail: e.target.value })} rows={3} placeholder="Jelaskan tujuan kunjungan Anda..." />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label>Tanggal Masuk</Label>
                    <Input className="mt-1.5" type="date" value={data.entryDate} onChange={(e) => update({ entryDate: e.target.value })} />
                  </div>
                  <div>
                    <Label>Tanggal Keluar</Label>
                    <Input className="mt-1.5" type="date" value={data.exitDate} onChange={(e) => update({ exitDate: e.target.value })} />
                  </div>
                  <div>
                    <Label>Jumlah Anggota</Label>
                    <Input className="mt-1.5" type="number" min={1} max={50} value={data.teamSize} onChange={(e) => update({ teamSize: Number(e.target.value) })} />
                  </div>
                </div>
                {data.applicantType === "peneliti" && (
                  <div>
                    <Label>Deklarasi Peralatan</Label>
                    <Textarea className="mt-1.5" value={data.equipmentDeclaration} onChange={(e) => update({ equipmentDeclaration: e.target.value })} rows={2} placeholder="Daftar peralatan yang akan dibawa..." />
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardContent className="space-y-4 p-6">
                <div>
                  <Label>Unggah Dokumen Pendukung</Label>
                  <p className="mb-3 text-xs text-muted-foreground">
                    Unggah KTP/Paspor, surat rekomendasi, dan dokumen pendukung lainnya. Format PDF/JPG, max 5MB.
                  </p>
                  <FileUpload
                    files={files}
                    onFilesChange={setFiles}
                    accept=".pdf,.jpg,.jpeg,.png"
                    maxSize={5 * 1024 * 1024}
                    maxFiles={5}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {step === 5 && (
            <Card>
              <CardContent className="space-y-6 p-6">
                <h3 className="font-semibold">Tinjau Data Permohonan</h3>
                <div className="space-y-3 rounded-lg border p-4 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Tipe Pemohon</span><span className="font-medium">{data.applicantType && APPLICANT_TYPE_LABELS[data.applicantType as keyof typeof APPLICANT_TYPE_LABELS]}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Nama</span><span className="font-medium">{data.fullName}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Institusi</span><span className="font-medium">{data.institution}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-medium">{data.email}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Kawasan</span><span className="font-medium">{CONSERVATION_AREAS.find((a) => a.id === data.targetArea)?.name ?? "-"}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Tanggal</span><span className="font-medium">{data.entryDate} — {data.exitDate}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Anggota Tim</span><span className="font-medium">{data.teamSize} orang</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Dokumen</span><span className="font-medium">{files.length} file</span></div>
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mt-1" />
                  <span className="text-sm text-muted-foreground">
                    Saya menyatakan bahwa data yang saya berikan adalah benar dan saya menyetujui syarat dan ketentuan yang berlaku.
                  </span>
                </label>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="gap-2"
            >
              <ArrowLeft className="size-4" /> Sebelumnya
            </Button>
            {step < 5 ? (
              <Button onClick={() => setStep((s) => Math.min(5, s + 1))} className="gap-2">
                Selanjutnya <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!agreeTerms} className="gap-2">
                <Check className="size-4" /> Kirim Permohonan
              </Button>
            )}
          </div>
        </MultiStepWrapper>
      </div>
    </div>
  );
}
