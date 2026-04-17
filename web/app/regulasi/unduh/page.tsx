import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { REGULATIONS } from "@/data/regulations";
import { Download, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Unduh Dokumen Regulasi",
  description: "Akses cepat untuk mengunduh dokumen peraturan perundang-undangan terkait konservasi.",
};

export default function RegulationsDownloadPage() {
  const sortedRegulations = [...REGULATIONS].sort((a, b) => b.year - a.year);

  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb items={[{ label: "Regulasi", href: "/regulasi" }, { label: "Unduh Dokumen" }]} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Unduh Dokumen Regulasi</h1>
        <p className="mt-2 text-muted-foreground">
          Daftar lengkap dokumen regulasi yang dapat diunduh dalam format PDF.
        </p>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 transition-colors">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Judul Regulasi</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Jenis</th>
                <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">Tahun</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {sortedRegulations.map((reg) => (
                <tr key={reg.slug} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-3">
                      <FileText className="size-4 text-muted-foreground shrink-0" />
                      <span className="font-medium">{reg.shortTitle}</span>
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <Badge variant="outline" className="whitespace-nowrap">{reg.type}</Badge>
                  </td>
                  <td className="p-4 align-middle text-center">
                    {reg.year}
                  </td>
                  <td className="p-4 align-middle text-right">
                    <Button variant="ghost" size="sm" className="gap-2" render={<a href={reg.downloadUrl} />}>
                      <Download className="size-4" />
                      <span className="hidden sm:inline">Unduh</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
