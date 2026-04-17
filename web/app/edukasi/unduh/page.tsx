import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Download, FileText, Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Materi Edukasi",
  description: "Unduh materi edukasi konservasi, panduan identifikasi satwa, dan poster kawasan konservasi.",
};

const EDUCATIONAL_MATERIALS = [
  {
    title: "Panduan Identifikasi Satwa Dilindungi",
    description: "Panduan praktis untuk mengidentifikasi berbagai jenis satwa yang dilindungi di wilayah Papua Barat Daya.",
    type: "PDF",
    size: "4.2 MB",
    icon: FileText,
  },
  {
    title: "Buku Saku Konservasi untuk Masyarakat",
    description: "Informasi dasar mengenai pentingnya konservasi dan peran masyarakat dalam menjaga ekosistem.",
    type: "PDF",
    size: "2.8 MB",
    icon: FileText,
  },
  {
    title: "Poster Kawasan Konservasi Papua Barat Daya",
    description: "Peta dan visualisasi kawasan konservasi yang dikelola oleh BBKSDA Papua Barat Daya.",
    type: "JPG",
    size: "5.5 MB",
    icon: ImageIcon,
  },
  {
    title: "Modul Pendidikan Lingkungan Hidup",
    description: "Materi ajar untuk sekolah mengenai pelestarian alam dan keanekaragaman hayati Papua.",
    type: "PDF",
    size: "3.1 MB",
    icon: FileText,
  },
];

export default function EducationDownloadsPage() {
  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb items={[{ label: "Edukasi", href: "/edukasi" }, { label: "Unduhan" }]} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Materi Edukasi</h1>
        <p className="mt-2 text-muted-foreground">
          Kumpulan materi edukasi yang dapat diunduh untuk meningkatkan pemahaman tentang konservasi.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {EDUCATIONAL_MATERIALS.map((material, index) => (
          <Card key={index} className="flex flex-col">
            <CardContent className="flex flex-1 flex-col p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <material.icon className="size-6" />
                </div>
                <Badge variant="secondary">{material.type}</Badge>
              </div>
              
              <h3 className="text-lg font-semibold leading-tight">{material.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {material.description}
              </p>
              
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{material.size}</span>
                <Button variant="outline" size="sm" className="gap-2" render={<a href="#" />}>
                  <Download className="size-4" />
                  Unduh
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
