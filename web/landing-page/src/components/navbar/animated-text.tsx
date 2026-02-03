"use client";

import { useLoaderComplete } from "@/hooks/use-loader-complete";
import { motion } from "motion/react";
import type { ElementType } from "react";
import { NavItemButton } from "./nav-item-button";

interface AnimatedTextProps {
    text: string;
    className?: string;
    as?: ElementType;
    delay?: number;
}

/**
 * Animated text component that reveals words with a staggered slide-up animation.
 * Waits for the page loader to complete before starting the animation.
 */
export function AnimatedText({
    text,
    className = "",
    as: Tag = "span",
    delay = 0,
}: AnimatedTextProps) {
    const words = text.split(" ");
    const isLoaderComplete = useLoaderComplete();

    return (
        <Tag className={`inline-flex flex-wrap ${className}`}>
            {words.map((word, wordIndex) => (
                <span
                    key={wordIndex}
                    className="overflow-hidden inline-block mr-[0.25em]"
                >
                    <motion.span
                        className="inline-block"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={
                            isLoaderComplete
                                ? { y: 0, opacity: 1 }
                                : { y: "100%", opacity: 0 }
                        }
                        transition={{
                            duration: 0.5,
                            delay: delay + wordIndex * 0.04,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </Tag>
    );
}

interface AnimatedListItemProps {
    text: string;
    index: number;
    baseDelay?: number;
}

/**
 * Animated list item component for navigation menus.
 * Wraps text in NavItemButton for ghost styling with animated underline.
 */
export function AnimatedListItem({
    text,
    index,
    baseDelay = 0,
}: AnimatedListItemProps) {
    return (
        <li>
            <NavItemButton>
                <AnimatedText text={text} delay={baseDelay + index * 0.08} />
            </NavItemButton>
        </li>
    );
}
