"use client";

import { useTheme } from "@/hooks/use-theme";
import { Dithering } from "@paper-design/shaders-react";

/**
 * Reusable dithering background component with theme-aware colors.
 * @param {{ className?: string }} props
 */
export function DitheringBackground({ className = "" }) {
    const { isDark } = useTheme();

    return (
        <Dithering
            colorBack={isDark ? "#171717" : "#f5f5f5"}
            colorFront="#1e9400"
            shape="warp"
            type="4x4"
            size={2}
            speed={0.08}
            className={className}
        />
    );
}
