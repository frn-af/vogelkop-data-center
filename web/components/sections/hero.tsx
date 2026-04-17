"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-forest">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/placeholder/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-[var(--padding-section-x)] py-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl space-y-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm font-medium tracking-widest text-forest-foreground/70 uppercase"
          >
            Balai Besar KSDA Papua Barat Daya
          </motion.p>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-forest-foreground sm:text-5xl lg:text-6xl">
            Melindungi{" "}
            <span className="text-primary">Keanekaragaman Hayati</span>{" "}
            Papua Barat Daya
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-forest-foreground/70 sm:text-lg">
            Portal resmi layanan publik, perizinan kawasan konservasi, dan
            informasi keanekaragaman hayati di Semenanjung Kepala Burung.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <Link href="/layanan">
              <Button size="lg" className="gap-2">
                Akses Layanan Online
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/layanan/laporan-insiden">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-forest-foreground/20 text-forest-foreground hover:bg-forest-foreground/10"
              >
                <AlertTriangle className="size-4" />
                Lapor Insiden
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
