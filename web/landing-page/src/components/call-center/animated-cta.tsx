"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../optics/card";
import { BadgeAlertIcon } from "../ui/badge-alert";
import { Button } from "../ui/button";
import { CalendarCheck2Icon } from "../ui/calendar-check-2";
import { LayersIcon } from "../ui/layers";

/** Animation timing constants */
const ANIMATION = {
    wordDuration: 0.5,
    wordStagger: 0.04,
    easing: [0.25, 0.46, 0.45, 0.94] as const,
} as const;

/** Feature cards data */
const FEATURES = [
    {
        icon: BadgeAlertIcon,
        title: "Pengaduan Publik",
        description:
            "Sampaikan keluhan atau pengaduan terkait pelayanan konservasi.",
        button: "Call Center",
    },
    {
        icon: CalendarCheck2Icon,
        title: "SIMAKSI",
        description: "Surat Izin Masuk Kawasan Konservasi",
        button: "Ajukan SIMAKSI",
    },
    {
        icon: LayersIcon,
        title: "SATS-DN",
        description: "Surat Angkut Tumbuhan dan Satwa Liar Dalam Negeri",
        button: "Ajukan SATS-DN",
    },
] as const;

interface FeatureCardProps {
    feature: (typeof FEATURES)[number];
    index: number;
    isInView: boolean;
}

/**
 * Feature card component using optics Card
 */
function FeatureCard({ feature, index, isInView }: FeatureCardProps) {
    const Icon = feature.icon;

    return (
        <motion.div
            className="w-full max-w-[280px] h-full shrink-0"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.1,
                ease: ANIMATION.easing,
            }}
        >
            <Card
                decorations
                className="border border-border bg-transparent ring-0 h-full"
            >
                <CardHeader className="h-3/5">
                    {/* Icon with Corner Decorations */}
                    <div className="mb-12">
                        <Card
                            decorations
                            className="w-14 h-14 border border-border bg-transparent ring-0 flex items-center justify-center"
                        >
                            <Icon className="w-7 h-7" />
                        </Card>
                    </div>
                    <CardTitle className="text-lg font-semibold">
                        {feature.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-1/5">
                    <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                    </CardDescription>
                </CardContent>
                <CardFooter background className="justify-end h-1/5">
                    <Button
                        variant="decorations"
                        className="px-4 py-2 bg-primary hover:bg-primary-foreground text-background hover:text-foreground"
                    >
                        {feature.button}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

/**
 * Main animated CTA section component
 */
export function AnimatedCTA() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const description =
        "Sampaikan pengaduan, kritik, atau saran Anda terkait pelayanan dan pengelolaan kawasan konservasi — kami siap mendengar dan membantu setiap saat.";

    const handlePrev = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -300,
                behavior: "smooth",
            });
            setCurrentIndex(Math.max(0, currentIndex - 1));
        }
    };

    const handleNext = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 300,
                behavior: "smooth",
            });
            setCurrentIndex(Math.min(FEATURES.length - 1, currentIndex + 1));
        }
    };

    return (
        <section
            ref={sectionRef}
            id="call-center"
            className=" overflow-hidden"
            aria-label="Layanan Pengaduan"
        >
            <div className="flex flex-col lg:flex-row">
                {/* Left: Large typography and CTA */}
                <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    {/* Description */}
                    <motion.p
                        className="text-zinc-400 text-sm md:text-base max-w-md mb-8 leading-relaxed"
                        initial={{ y: 20, opacity: 0 }}
                        animate={
                            isInView
                                ? { y: 0, opacity: 1 }
                                : { y: 20, opacity: 0 }
                        }
                        transition={{
                            duration: 0.5,
                            delay: 0.2,
                            ease: ANIMATION.easing,
                        }}
                    >
                        {description}
                    </motion.p>

                    {/* Animated Bar */}
                    <motion.div
                        className="h-px bg-primary mb-12 origin-left"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.3,
                            ease: ANIMATION.easing,
                        }}
                    />

                    {/* Large Typography */}
                    <div className="overflow-hidden">
                        <motion.h2
                            className=" text-4xl font-semibold"
                            initial={{ y: "100%" }}
                            animate={isInView ? { y: 0 } : { y: "100%" }}
                            transition={{
                                duration: 0.8,
                                delay: 0.1,
                                ease: ANIMATION.easing,
                            }}
                        >
                            Layanan Kami
                        </motion.h2>
                    </div>
                </div>

                {/* Right: Feature cards */}
                <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    {/* Cards container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {FEATURES.map((feature, index) => (
                            <FeatureCard
                                key={feature.title}
                                feature={feature}
                                index={index}
                                isInView={isInView}
                            />
                        ))}
                    </div>

                    {/* Navigation arrows */}
                    <motion.div
                        className="flex gap-4 mt-8 justify-center lg:justify-start"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.6,
                            ease: ANIMATION.easing,
                        }}
                    >
                        <button
                            onClick={handlePrev}
                            className="w-10 h-10 rounded-full border border-zinc-600 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-zinc-400 transition-colors"
                            aria-label="Previous"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-10 h-10 rounded-full border border-zinc-600 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-zinc-400 transition-colors"
                            aria-label="Next"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
