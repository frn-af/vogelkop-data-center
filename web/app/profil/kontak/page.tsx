import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ORGANIZATION } from "@/data/organization";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Kontak - ${ORGANIZATION.name}`,
  description: `Hubungi ${ORGANIZATION.fullName} untuk informasi lebih lanjut.`,
};

export default function KontakPage() {
  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Profil", href: "/profil/tentang-kami" },
          { label: "Kontak" },
        ]}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <section className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Kontak Kami
            </h1>
            <p className="text-lg text-muted-foreground">
              Kami siap melayani pertanyaan dan koordinasi terkait pengelolaan kawasan konservasi di wilayah Papua Barat Daya.
            </p>
          </section>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-3 text-primary">
                  <MapPin className="h-5 w-5" />
                  <span className="font-bold">Alamat</span>
                </div>
                <p className="text-sm leading-relaxed">
                  {CONTACT.address}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-3 text-primary">
                  <Clock className="h-5 w-5" />
                  <span className="font-bold">Jam Kantor</span>
                </div>
                <p className="text-sm leading-relaxed">
                  {CONTACT.officeHours}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-3 text-primary">
                  <Phone className="h-5 w-5" />
                  <span className="font-bold">Telepon & Fax</span>
                </div>
                <div className="text-sm space-y-1">
                  <p>Telp: {CONTACT.phone}</p>
                  <p>Fax: {CONTACT.fax}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-3 text-primary">
                  <Mail className="h-5 w-5" />
                  <span className="font-bold">Email & Web</span>
                </div>
                <div className="text-sm space-y-1">
                  <p>{CONTACT.email}</p>
                  <p>{ORGANIZATION.website}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Hubungi Kami</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" placeholder="Masukkan nama Anda" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="nama@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subjek</Label>
              <Input id="subject" placeholder="Perihal pesan" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Pesan</Label>
              <Textarea id="message" placeholder="Tuliskan pesan Anda di sini..." className="min-h-[150px]" />
            </div>
            <Button className="w-full">Kirim Pesan</Button>
            <p className="text-xs text-center text-muted-foreground">
              Pesan Anda akan kami tindaklanjuti dalam waktu maksimal 2x24 jam kerja.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
