"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../optics/card";

/** Animation timing constants */
const ANIMATION = {
    duration: 0.6,
    stagger: 0.1,
    easing: [0.25, 0.46, 0.45, 0.94],
};

/** Statistics data */
const STATISTICS = [
    {
        id: "kawasan",
        value: 16,
        suffix: "",
        title: "Total Kawasan",
        description: "Kawasan konservasi yang dikelola",
        size: "tall",
    },
    {
        id: "luas",
        value: 1.7,
        suffix: " Jt Ha",
        title: "Luas Hutan",
        description: "Total luas kawasan lindung",
        size: "tall",
    },
    {
        id: "endemik",
        value: 42,
        suffix: "",
        title: "Spesies Endemik",
        description: "Flora & fauna endemik",
        size: "standard",
    },
    {
        id: "patroli",
        value: 128,
        suffix: "",
        title: "Jumlah Patroli",
        description: "Patroli per tahun",
        size: "standard",
    },
    {
        id: "satwa",
        value: 156,
        suffix: "",
        title: "Satwa Dilindungi",
        description: "Total jenis satwa yang dilindungi di wilayah kerja",
        size: "wide",
    },
    {
        id: "penegakan",
        value: 24,
        suffix: "",
        title: "Kasus Penegakan",
        description: "Kasus ditangani tahun ini",
        size: "standard",
    },
];

/**
 * Animated number counter hook
 */
function useAnimatedNumber(target, isInView, duration = 1.5) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        const startTime = Date.now();
        const isFloat = target % 1 !== 0;

        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            if (isFloat) {
                setCurrent(Number((target * eased).toFixed(1)));
            } else {
                setCurrent(Math.floor(target * eased));
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }, [target, isInView, duration]);

    return current;
}

/**
 * Single statistic card component with grain texture
 */
function StatCard({ stat, index, isInView }) {
    const animatedValue = useAnimatedNumber(stat.value, isInView);

    const sizeClasses = {
        tall: "md:row-span-2",
        wide: "md:col-span-2",
        standard: "",
    };

    return (
        <motion.div
            className={`${sizeClasses[stat.size] || ""} group/stat`}
            initial={{ y: 40, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
            transition={{
                duration: ANIMATION.duration,
                delay: index * ANIMATION.stagger,
                ease: ANIMATION.easing,
            }}
        >
            <Card decorations className="h-full">
                <CardHeader className="pb-2 relative z-10">
                    <CardDescription className="text-muted-foreground text-xs uppercase tracking-wider">
                        {stat.title}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center flex-1 relative z-10">
                    <CardTitle className="text-4xl md:text-5xl font-bold text-primary tabular-nums">
                        {animatedValue}
                        {stat.suffix}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm mt-2">
                        {stat.description}
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );
}

/**
 * Bento grid layout for conservation statistics
 */
export function BentoGrid() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <div ref={sectionRef} className="mx-auto p-8 md:p-16">
            {/* Section header */}
            <div className="mb-12">
                <motion.div
                    className="overflow-hidden"
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: 0 } : { y: "100%" }}
                    transition={{
                        duration: 0.8,
                        ease: ANIMATION.easing,
                    }}
                >
                    <h2 className="text-3xl md:text-4xl font-semibold">
                        Kawasan Konservasi
                    </h2>
                </motion.div>
                <motion.p
                    className="text-muted-foreground text-sm md:text-base max-w-xl mt-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={
                        isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                    }
                    transition={{
                        duration: 0.5,
                        delay: 0.2,
                        ease: ANIMATION.easing,
                    }}
                >
                    Data statistik pengelolaan kawasan konservasi di wilayah
                    kerja BBKSDA Papua Barat Daya.
                </motion.p>

                {/* Animated bar */}
                <motion.div
                    className="h-px bg-primary mt-8 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.3,
                        ease: ANIMATION.easing,
                    }}
                />
            </div>

            {/* Bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr">
                {STATISTICS.map((stat, index) => (
                    <StatCard
                        key={stat.id}
                        stat={stat}
                        index={index}
                        isInView={isInView}
                    />
                ))}
            </div>
        </div>
    );
}
