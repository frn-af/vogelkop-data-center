"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
    <section className="bg-muted/50 py-[var(--padding-section-y)]">
      <div className="mx-auto max-w-7xl px-[var(--padding-section-x)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6 rounded-2xl border border-warning/20 bg-warning/5 p-8 text-center sm:p-12"
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-warning/10">
            <AlertTriangle className="size-7 text-warning" />
          </div>
          <div className="max-w-lg space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Laporkan Gangguan Satwa Liar
            </h2>
            <p className="text-muted-foreground">
              Temukan konflik satwa, kebakaran hutan, atau aktivitas ilegal? Laporkan sekarang — tim kami akan merespons sesuai SLA.
            </p>
          </div>
          <Link href="/layanan/laporan-insiden/buat">
            <Button size="lg" className="gap-2">
              Buat Laporan
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
