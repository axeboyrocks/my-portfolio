"use client";
import { useEffect } from "react";

export default function VisitorTracker() {
    useEffect(() => {
        // Track visitor on mount (once per page load)
        const trackVisitor = async () => {
            try {
                const data = {
                    userAgent: navigator.userAgent,
                    referrer: document.referrer || "(direct)",
                    pageUrl: window.location.href,
                };

                // Fire and forget - don't block page load
                await fetch("/api/visitor-track", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }).catch(() => {
                    // Silently fail - don't impact user experience
                });
            } catch (e) {
                // Silently fail
            }
        };

        trackVisitor();
    }, []); // Run once on mount

    return null; // This component doesn't render anything
}
