import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { FAQ_ITEMS, FAQ_CATEGORIES } from "@/data/faq";
import { HelpCircle, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Pertanyaan yang Sering Diajukan (FAQ)",
  description: "Temukan jawaban atas pertanyaan umum mengenai layanan, perizinan, dan kegiatan BBKSDA Papua Barat Daya.",
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb items={[{ label: "Edukasi", href: "/edukasi" }, { label: "FAQ" }]} />
      
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Pertanyaan yang Sering Diajukan (FAQ)</h1>
        <p className="mt-2 text-muted-foreground">
          Informasi lengkap untuk membantu Anda memahami layanan dan prosedur kami.
        </p>
      </div>

      <div className="space-y-12">
        {FAQ_CATEGORIES.map((category) => {
          const categoryItems = FAQ_ITEMS.filter((item) => item.category === category.slug);
          
          if (categoryItems.length === 0) return null;

          return (
            <section key={category.slug}>
              <div className="mb-6 flex items-center gap-2 border-b pb-2">
                <HelpCircle className="size-5 text-primary" />
                <h2 className="text-xl font-bold">{category.name}</h2>
              </div>
              
              <div className="grid gap-4">
                {categoryItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="mt-1 shrink-0">
                          <MessageCircle className="size-5 text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold leading-none">{item.question}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
