"use client";

import { Link2, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

export function ShareButtons({ url, title, className }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link berhasil disalin");
    } catch {
      toast.error("Gagal menyalin link");
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Share2 className="size-4" />
          Bagikan
        </span>

        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="icon" className="size-8">
            <MessageCircle className="size-4" />
            <span className="sr-only">Bagikan via WhatsApp</span>
          </Button>
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="icon" className="size-8">
            <span className="text-xs font-bold">f</span>
            <span className="sr-only">Bagikan via Facebook</span>
          </Button>
        </a>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="icon" className="size-8">
            <span className="text-xs font-bold">𝕏</span>
            <span className="sr-only">Bagikan via X</span>
          </Button>
        </a>

        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={copyToClipboard}
        >
          <Link2 className="size-4" />
          <span className="sr-only">Salin link</span>
        </Button>
      </div>
    </div>
  );
}
