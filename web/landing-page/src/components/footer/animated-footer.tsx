"use client";

import logoSrc from "@/assets/logo.svg";

import { DitheringBackground } from "@/components/effects/dithering-background";
import { motion } from "motion/react";
import { useState } from "react";

/** Animation timing constants */
const ANIMATION = {
    easing: [0.25, 0.46, 0.45, 0.94] as const,
} as const;

/**
 * Footer link component
 */
function FooterLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
            {children}
        </a>
    );
}

/**
 * Main footer component with pixel animation background
 */
export function AnimatedFooter() {
    const [currentYear] = useState(() => new Date().getFullYear());

    return (
        <footer className="relative overflow-hidden border-t border-border">
            <DitheringBackground className="w-full h-full absolute top-0 left-0 opacity-30" />
            {/* Content */}
            <div className="relative z-10">
                {/* Main Footer Content */}
                <div className="px-8 md:px-12 lg:px-16 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Brand */}
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    ease: ANIMATION.easing,
                                }}
                            >
                                <img
                                    src={logoSrc.src}
                                    alt="BBKSDA Papua Barat Daya Logo"
                                    className="h-16 w-auto mb-4"
                                />
                            </motion.div>
                            <motion.h3
                                className="text-xl font-semibold"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.05,
                                    ease: ANIMATION.easing,
                                }}
                            >
                                BBKSDA Papua Barat Daya
                            </motion.h3>
                            <motion.p
                                className="text-muted-foreground text-sm leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.1,
                                    ease: ANIMATION.easing,
                                }}
                            >
                                Menjaga kelestarian biodiversitas dan kawasan
                                konservasi di Papua Barat Daya.
                            </motion.p>
                        </div>

                        {/* Quick Links */}
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: 0.2,
                                ease: ANIMATION.easing,
                            }}
                        >
                            <h4 className="font-medium text-sm uppercase tracking-wide">
                                Layanan
                            </h4>
                            <div className="flex flex-col gap-2">
                                <FooterLink href="#">SIMAKSI</FooterLink>
                                <FooterLink href="#">SATS-DN</FooterLink>
                                <FooterLink href="#">
                                    Pengaduan Publik
                                </FooterLink>
                                <FooterLink href="#">
                                    Informasi Kawasan
                                </FooterLink>
                            </div>
                        </motion.div>

                        {/* Resources */}
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: 0.3,
                                ease: ANIMATION.easing,
                            }}
                        >
                            <h4 className="font-medium text-sm uppercase tracking-wide">
                                Informasi
                            </h4>
                            <div className="flex flex-col gap-2">
                                <FooterLink href="#">
                                    Berita & Artikel
                                </FooterLink>
                                <FooterLink href="#">Galeri</FooterLink>
                                <FooterLink href="#">Peta Kawasan</FooterLink>
                                <FooterLink href="#">
                                    Laporan Tahunan
                                </FooterLink>
                            </div>
                        </motion.div>

                        {/* Contact */}
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: 0.4,
                                ease: ANIMATION.easing,
                            }}
                        >
                            <h4 className="font-medium text-sm uppercase tracking-wide">
                                Kontak
                            </h4>
                            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                <p>Jl. Raya Sorong - Makbon</p>
                                <p>Kota Sorong, Papua Barat Daya</p>
                                <p>Telp: (0951) 123456</p>
                                <p>Email: info@bbksda-papuabaratdaya.go.id</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border px-8 md:px-12 lg:px-16 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <motion.p
                            className="text-sm text-muted-foreground"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: 0.5,
                                ease: ANIMATION.easing,
                            }}
                        >
                            © {currentYear} BBKSDA Papua Barat Daya. Hak Cipta
                            Dilindungi.
                        </motion.p>
                        <motion.div
                            className="flex gap-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: 0.6,
                                ease: ANIMATION.easing,
                            }}
                        >
                            <FooterLink href="#">Kebijakan Privasi</FooterLink>
                            <FooterLink href="#">Syarat & Ketentuan</FooterLink>
                        </motion.div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
