"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Only track in production to avoid polluting stats
        if (process.env.NODE_ENV !== "production") return;

        const trackView = async () => {
            try {
                await supabase.from("page_views").insert([
                    {
                        page_path: pathname,
                        user_agent: navigator.userAgent,
                        referrer: document.referrer || null,
                    }
                ]);
            } catch (error) {
                console.error("Analytics error:", error);
            }
        };

        trackView();
    }, [pathname]);

    return null;
}
