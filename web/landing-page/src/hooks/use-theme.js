"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect the current theme (dark/light mode).
 * Uses MutationObserver to watch for class changes on the document element.
 * @returns {{ isDark: boolean }} - Whether dark mode is active
 */
export function useTheme() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            const isDarkTheme =
                document.documentElement.classList.contains("dark");
            setIsDark(isDarkTheme);
        };

        // Initial check
        checkTheme();

        // Watch for class changes on html element
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    return { isDark };
}
