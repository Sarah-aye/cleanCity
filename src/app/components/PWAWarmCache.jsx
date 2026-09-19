"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PWAWarmCache() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Warm up App Router route caches so HTML/RSC payloads are stored offline
      router.prefetch("/recycling-tracker");
      router.prefetch("/pledge");
      router.prefetch("/waste-categories");
    }
  }, [router]);

  return null; // Renders no visible HTML
}
