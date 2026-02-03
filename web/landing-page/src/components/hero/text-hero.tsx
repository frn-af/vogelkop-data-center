"use client";

import { useLoaderComplete } from "@/hooks/use-loader-complete";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Marquee } from "./marquee";

/** Hero text content for the three columns */
const HERO_TEXTS = [
    "Menjaga denyut -- Nadi **Biodiversitas** endemik Papua Barat Daya demi masa depan alam yang tetap terjaga.",
    "Mengelola kawasan **Konservasi** secara berkelanjutan melalui sinergi data dan aksi nyata di lapangan.",
    "Memberikan layanan informasi dan perizinan yang transparan demi kolaborasi lestari bersama **Masyarakat.**",
] as const;

/** Animation timing constants */
const ANIMATION = {
    wordDuration: 0.5,
    wordStagger: 0.04,
    easing: [0.25, 0.46, 0.45, 0.94] as const,
} as const;

/**
 * Parses text for highlighted words (wrapped in **).
 * Returns the display text and whether it's highlighted.
 */
function parseHighlight(word: string) {
    const isHighlighted = word.startsWith("**") && word.endsWith("**");
    const displayWord = isHighlighted ? word.slice(2, -2) : word;
    return { displayWord, isHighlighted };
}

interface AnimatedWordOnLoadProps {
    word: string;
    wordIndex: number;
    totalWords: number;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
    isLoaderComplete: boolean;
}

/**
 * Animated word component for the initial hero text.
 * Slides up on page load, then fades out as user scrolls.
 */
function AnimatedWordOnLoad({
    word,
    wordIndex,
    totalWords,
    scrollYProgress,
    isLoaderComplete,
}: AnimatedWordOnLoadProps) {
    const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
    const { displayWord, isHighlighted } = parseHighlight(word);

    // Staggered fade out: each word fades out at slightly different times
    const fadeOutStart = 0.3 + (wordIndex / totalWords) * 0.15;
    const fadeOutEnd = fadeOutStart + 0.05;

    const scrollOpacity = useTransform(
        scrollYProgress,
        [fadeOutStart, fadeOutEnd],
        [1, 0],
    );
    const scrollY = useTransform(
        scrollYProgress,
        [fadeOutStart, fadeOutEnd],
        ["0%", "100%"],
    );

    const highlightClass = isHighlighted
        ? "text-primary font-semibold underline decoration-dotted underline-offset-4"
        : "";

    return (
        <span className="overflow-hidden inline-block mr-[0.25em]">
            <motion.span
                className={`inline-block ${highlightClass}`}
                initial={{ y: "100%", opacity: 0 }}
                animate={
                    isLoaderComplete
                        ? { y: 0, opacity: 1 }
                        : { y: "100%", opacity: 0 }
                }
                transition={{
                    duration: ANIMATION.wordDuration,
                    delay: wordIndex * ANIMATION.wordStagger,
                    ease: ANIMATION.easing,
                }}
                onAnimationComplete={() => {
                    if (isLoaderComplete) {
                        setHasAnimatedIn(true);
                    }
                }}
                style={
                    hasAnimatedIn
                        ? { opacity: scrollOpacity, y: scrollY }
                        : undefined
                }
            >
                {displayWord}
            </motion.span>
        </span>
    );
}

interface AnimatedWordOnScrollProps {
    word: string;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
    startOffset: number;
    endOffset: number;
    fadeOutStart: number;
    fadeOutEnd: number;
}

/**
 * Animated word component for text that appears on scroll.
 * Slides in as user scrolls down, then fades out.
 */
function AnimatedWordOnScroll({
    word,
    scrollYProgress,
    startOffset,
    endOffset,
    fadeOutStart,
    fadeOutEnd,
}: AnimatedWordOnScrollProps) {
    const { displayWord, isHighlighted } = parseHighlight(word);

    const yIn = useTransform(
        scrollYProgress,
        [startOffset, endOffset],
        ["100%", "0%"],
    );
    const yOut = useTransform(
        scrollYProgress,
        [fadeOutStart, fadeOutEnd],
        ["0%", "100%"],
    );
    const opacityIn = useTransform(
        scrollYProgress,
        [startOffset, endOffset],
        [0, 1],
    );
    const opacityOut = useTransform(
        scrollYProgress,
        [fadeOutStart, fadeOutEnd],
        [1, 0],
    );

    const y = useTransform(() => {
        const progress = scrollYProgress.get();
        return progress < endOffset ? yIn.get() : yOut.get();
    });

    const opacity = useTransform(() => {
        const progress = scrollYProgress.get();
        if (progress < endOffset) return opacityIn.get();
        if (progress > fadeOutStart) return opacityOut.get();
        return 1;
    });

    const highlightClass = isHighlighted
        ? "text-primary font-semibold underline decoration-dotted underline-offset-4"
        : "";

    return (
        <span className="overflow-hidden inline-block mr-[0.25em]">
            <motion.span
                className={`inline-block ${highlightClass}`}
                style={{ y, opacity }}
            >
                {displayWord}
            </motion.span>
        </span>
    );
}

interface AnimatedTextOnLoadProps {
    text: string;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
    className?: string;
    isLoaderComplete: boolean;
}

/**
 * Container for the initial animated text column.
 * Splits text into words and animates each with stagger.
 */
function AnimatedTextOnLoad({
    text,
    scrollYProgress,
    className = "",
    isLoaderComplete,
}: AnimatedTextOnLoadProps) {
    const words = text.split(" ");
    const totalWords = words.length;

    return (
        <p className={`flex flex-wrap ${className}`} data-index={0}>
            {words.map((word, wordIndex) => (
                <AnimatedWordOnLoad
                    key={wordIndex}
                    word={word}
                    wordIndex={wordIndex}
                    totalWords={totalWords}
                    scrollYProgress={scrollYProgress}
                    isLoaderComplete={isLoaderComplete}
                />
            ))}
        </p>
    );
}

interface AnimatedTextOnScrollProps {
    text: string;
    columnIndex: number;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
    className?: string;
}

/**
 * Container for scroll-triggered animated text columns.
 * Each column appears at different scroll positions.
 */
function AnimatedTextOnScroll({
    text,
    columnIndex,
    scrollYProgress,
    className = "",
}: AnimatedTextOnScrollProps) {
    const words = text.split(" ");
    const totalWords = words.length;

    // Column timing: Column 1 appears 0.3-0.5, Column 2 appears 0.7-0.9
    const columnStart = columnIndex === 1 ? 0.3 : 0.7;
    const columnEnd = columnIndex === 1 ? 0.5 : 0.9;
    const fadeOutRangeStart = columnIndex === 1 ? 0.7 : 1.1;
    const fadeOutRangeEnd = columnIndex === 1 ? 0.9 : 1.2;
    const columnRange = columnEnd - columnStart;
    const fadeOutRange = fadeOutRangeEnd - fadeOutRangeStart;

    return (
        <p className={`flex flex-wrap ${className}`} data-index={columnIndex}>
            {words.map((word, wordIndex) => {
                const wordStart =
                    columnStart + (wordIndex / totalWords) * columnRange * 0.8;
                const wordEnd = Math.min(wordStart + 0.03, columnEnd);
                const wordFadeOutStart =
                    fadeOutRangeStart +
                    (wordIndex / totalWords) * fadeOutRange * 0.8;
                const wordFadeOutEnd = Math.min(
                    wordFadeOutStart + 0.03,
                    fadeOutRangeEnd,
                );

                return (
                    <AnimatedWordOnScroll
                        key={wordIndex}
                        word={word}
                        scrollYProgress={scrollYProgress}
                        startOffset={wordStart}
                        endOffset={wordEnd}
                        fadeOutStart={wordFadeOutStart}
                        fadeOutEnd={wordFadeOutEnd}
                    />
                );
            })}
        </p>
    );
}

/** Pixel configuration for hero background */
const PIXEL_CONFIG = {
    size: 6,
    gap: 1,
} as const;

interface Pixel {
    x: number;
    y: number;
    targetOpacity: number;
    phase: number;
    speed: number;
    hue: number;
}

/**
 * Generate landscape height at a given x position
 */
function getLandscapeHeight(x: number, width: number): number {
    const normalizedX = x / width;
    let height = 0;

    height += Math.sin(normalizedX * Math.PI * 2) * 0.3;
    height += Math.sin(normalizedX * Math.PI * 4 + 1) * 0.15;
    height += Math.sin(normalizedX * Math.PI * 8 + 2) * 0.1;
    height += Math.sin(normalizedX * Math.PI * 6 + 0.5) * 0.08;
    height += Math.sin(normalizedX * Math.PI * 20 + 3) * 0.05;
    height += Math.sin(normalizedX * Math.PI * 30) * 0.03;

    return (height + 0.7) * 0.5;
}

/**
 * Pixel background component for hero section
 */
function PixelBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pixelsRef = useRef<Pixel[]>([]);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { size, gap } = PIXEL_CONFIG;
        const cellSize = size + gap;

        const initCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
            }

            const cols = Math.ceil(canvas.width / cellSize);
            const rows = Math.ceil(canvas.height / cellSize);

            pixelsRef.current = [];

            for (let x = 0; x < cols; x++) {
                const landscapeHeight = getLandscapeHeight(x, cols);
                const maxRow = Math.floor(rows * landscapeHeight);

                // Fill from top (0) down to maxRow (reversed)
                for (let y = 0; y < maxRow; y++) {
                    const edgeDistance = maxRow - y;
                    const isEdge = edgeDistance < 3;

                    if (isEdge && Math.random() > 0.6) continue;

                    pixelsRef.current.push({
                        x,
                        y,
                        targetOpacity: 0.3 + Math.random() * 0.3,
                        phase: Math.random() * Math.PI * 2,
                        speed: 0.015 + Math.random() * 0.015,
                        hue: 130 + Math.random() * 50,
                    });
                }
            }
        };

        initCanvas();

        let time = 0;
        const animate = () => {
            if (!ctx || !canvas) return;

            time += 0.016;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const pixel of pixelsRef.current) {
                const twinkle = Math.sin(time * pixel.speed * 60 + pixel.phase);
                const currentOpacity =
                    pixel.targetOpacity * (0.5 + twinkle * 0.5);

                ctx.fillStyle = `hsla(${pixel.hue}, 50%, 45%, ${currentOpacity})`;
                ctx.fillRect(
                    pixel.x * cellSize,
                    pixel.y * cellSize,
                    size,
                    size,
                );
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => initCanvas();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
        />
    );
}

/**
 * Main hero text component with scroll-driven animations.
 * Displays three columns of text that animate in sequence as user scrolls.
 */
export function TextHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isLoaderComplete = useLoaderComplete();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <article
            id="hero-section"
            ref={containerRef}
            className="h-[300vh] -mt-[50vh] relative"
        >
            <div className="sticky top-0 h-screen p-4 pb-16 flex items-center overflow-hidden">
                {/* Pixel Animation Background */}
                <div className="absolute inset-0 opacity-40">
                    <PixelBackground />
                </div>

                <div className="flex gap-4 text-3xl font-medium w-full px-8 relative z-10">
                    <div className="flex-1">
                        <AnimatedTextOnLoad
                            text={HERO_TEXTS[0]}
                            scrollYProgress={scrollYProgress}
                            className="text-hero"
                            isLoaderComplete={isLoaderComplete}
                        />
                    </div>
                    {HERO_TEXTS.slice(1).map((text, index) => (
                        <div key={index + 1} className="flex-1">
                            <AnimatedTextOnScroll
                                text={text}
                                columnIndex={index + 1}
                                scrollYProgress={scrollYProgress}
                            />
                        </div>
                    ))}
                </div>
                <Marquee />
            </div>
        </article>
    );
}
