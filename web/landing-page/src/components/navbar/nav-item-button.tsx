"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface NavItemButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

/**
 * Navbar item button with ghost variant and animated underline.
 * Underline slides from right to left on hover.
 */
export function NavItemButton({
    children,
    className,
    onClick,
}: NavItemButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                // Base styles - ghost variant
                "relative inline-flex items-center gap-2",
                "bg-transparent hover:bg-transparent",
                "text-inherit font-normal capitalize",
                "px-0 py-0",
                "cursor-pointer select-none",
                "transition-colors duration-150",
                // Underline container
                "group/nav-item",
                className,
            )}
        >
            {children}
            {/* Animated underline */}
            <span
                className={cn(
                    "absolute bottom-0 right-0",
                    "h-px bg-current",
                    "w-0 group-hover/nav-item:w-full",
                    "transition-[width] duration-300 ease-out",
                    // Slide from right to left by anchoring to right, then switching to left on hover
                    "group-hover/nav-item:left-0 group-hover/nav-item:right-auto",
                )}
                aria-hidden="true"
            />
        </button>
    );
}
