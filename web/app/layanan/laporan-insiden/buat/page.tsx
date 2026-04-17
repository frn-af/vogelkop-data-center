"use client";

import { useState } from "react";
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
import { INCIDENT_TYPES, URGENCY_LABELS } from "@/data/incidents";
import type { UrgencyLevel } from "@/data/types";
import { generateTrackingId } from "@/lib/format";
import { useGeolocation } from "@/hooks/use-geolocation";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, MapPin, Locate } from "lucide-react";

const STEPS = ["Jenis & Urgensi", "Lokasi", "Deskripsi & Bukti", "Data Pelapor"];

export default function BuatLaporanPage() {
  const [step, setStep] = useState(1);
  const [incidentType, setIncidentType] = useState("");
  const [urgency, setUrgency] = useState<UrgencyLevel | "">("");
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentTime, setIncidentTime] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationText, setLocationText] = useState("");
  const [description, setDescription] = useState("");
  const [animalsInvolved, setAnimalsInvolved] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [reporterName, setReporterName] = useState("");
  const [reporterPhone, setReporterPhone] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [preferredContact, setPreferredContact] = useState("phone");
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const router = useRouter();
  const geo = useGeolocation();

  const handleGeolocate = () => {
    geo.requestLocation();
  };

  if (geo.latitude && !latitude) {
    setLatitude(geo.latitude);
    setLongitude(geo.longitude);
  }

  const handleSubmit = () => {
    const id = generateTrackingId("INC");
    setTrackingId(id);
    setSubmitted(true);
    toast.success("Laporan berhasil dikirim!");
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-[var(--padding-section-x)] py-8">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <Check className="size-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Laporan Terkirim</h1>
            <p className="text-muted-foreground">
              Laporan insiden Anda telah berhasil dikirim. Tim kami akan merespons sesuai SLA.
            </p>
            <div className="rounded-lg border-2 border-primary/20 bg-primary/5 px-6 py-3">
              <p className="text-xs text-muted-foreground">Nomor Tiket</p>
              <p className="text-lg font-bold text-primary">{trackingId}</p>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => router.push("/layanan/laporan-insiden/lacak")}>
                Lacak Status
              </Button>
              <Button onClick={() => router.push("/layanan")}>Kembali</Button>
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
          { label: "Laporan Insiden", href: "/layanan/laporan-insiden" },
          { label: "Buat Laporan" },
        ]}
      />

      <h1 className="mt-8 text-2xl font-bold tracking-tight">Buat Laporan Insiden</h1>

      <div className="mt-8">
        <MultiStepWrapper steps={STEPS} currentStep={step}>
          {step === 1 && (
            <Card>
              <CardContent className="space-y-4 p-6">
                <div>
                  <Label>Jenis Insiden</Label>
                  <Select value={incidentType} onValueChange={(v) => v && setIncidentType(v)}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Pilih jenis insiden" /></SelectTrigger>
                    <SelectContent>
                      {INCIDENT_TYPES.map((t) => (
                        <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tingkat Urgensi</Label>
                  <Select value={urgency} onValueChange={(v) => v && setUrgency(v as UrgencyLevel)}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Pilih urgensi" /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(URGENCY_LABELS).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Tanggal Kejadian</Label>
                    <Input className="mt-1.5" type="date" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} />
                  </div>
                  <div>
                    <Label>Waktu Kejadian</Label>
                    <Input className="mt-1.5" type="time" value={incidentTime} onChange={(e) => setIncidentTime(e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-4">
                  <MapPin className="size-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {latitude
                        ? `${latitude.toFixed(4)}, ${longitude?.toFixed(4)}`
                        : "Lokasi belum ditentukan"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Klik tombol GPS atau masukkan koordinat manual
                    </p>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={handleGeolocate} disabled={geo.loading} className="gap-1">
                    <Locate className="size-4" />
                    {geo.loading ? "Mencari..." : "GPS"}
                  </Button>
                </div>
                {geo.error && <p className="text-sm text-destructive">{geo.error}</p>}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Latitude</Label>
                    <Input className="mt-1.5" type="number" step="any" value={latitude ?? ""} onChange={(e) => setLatitude(Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Longitude</Label>
                    <Input className="mt-1.5" type="number" step="any" value={longitude ?? ""} onChange={(e) => setLongitude(Number(e.target.value))} />
                  </div>
                </div>
                <div>
                  <Label>Deskripsi Lokasi (Opsional)</Label>
                  <Input className="mt-1.5" value={locationText} onChange={(e) => setLocationText(e.target.value)} placeholder="Kabupaten, Distrik, Kampung..." />
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardContent className="space-y-4 p-6">
                <div>
                  <Label>Deskripsi Insiden (Min. 50 karakter)</Label>
                  <Textarea className="mt-1.5" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Jelaskan kronologi kejadian secara detail..." />
                  <p className="mt-1 text-xs text-muted-foreground">{description.length}/50 karakter minimum</p>
                </div>
                {incidentType === "hwc" && (
                  <div>
                    <Label>Jumlah Satwa yang Terlibat</Label>
                    <Input className="mt-1.5" type="number" min={0} value={animalsInvolved} onChange={(e) => setAnimalsInvolved(e.target.value)} />
                  </div>
                )}
                <div>
                  <Label>Bukti Foto (Opsional)</Label>
                  <FileUpload
                    files={files}
                    onFilesChange={setFiles}
                    accept=".jpg,.jpeg,.png,.webp"
                    maxSize={10 * 1024 * 1024}
                    maxFiles={5}
                    label="Unggah foto bukti kejadian"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardContent className="space-y-4 p-6">
                <div>
                  <Label>Nama Pelapor (Opsional)</Label>
                  <Input className="mt-1.5" value={reporterName} onChange={(e) => setReporterName(e.target.value)} placeholder="Boleh anonim" />
                </div>
                <div>
                  <Label>Nomor Telepon (Wajib)</Label>
                  <Input className="mt-1.5" type="tel" value={reporterPhone} onChange={(e) => setReporterPhone(e.target.value)} placeholder="08xx-xxxx-xxxx" />
                </div>
                <div>
                  <Label>Email (Opsional)</Label>
                  <Input className="mt-1.5" type="email" value={reporterEmail} onChange={(e) => setReporterEmail(e.target.value)} />
                </div>
                <div>
                  <Label>Metode Kontak Pilihan</Label>
                  <Select value={preferredContact} onValueChange={(v) => v && setPreferredContact(v)}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phone">Telepon</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1} className="gap-2">
              <ArrowLeft className="size-4" /> Sebelumnya
            </Button>
            {step < 4 ? (
              <Button onClick={() => setStep((s) => Math.min(4, s + 1))} className="gap-2">
                Selanjutnya <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!reporterPhone} className="gap-2">
                <Check className="size-4" /> Kirim Laporan
              </Button>
            )}
          </div>
        </MultiStepWrapper>
      </div>
    </div>
  );
}
