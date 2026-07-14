"use client";

import { useEffect } from "react";

import { useLenisContext } from "@/components/ui/AppProviders";

export default function useScrollRestoration() {
  const { lenis, isDesktop } = useLenisContext();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const initialHash = window.location.hash;

    const timer = window.setTimeout(() => {
      if (initialHash) {
        const target =
          document.querySelector<HTMLElement>(initialHash);

        if (target) {
          if (isDesktop && lenis) {
            lenis.scrollTo(target, {
              offset: -80,
              immediate: true,
            });
          } else {
            const top = target.offsetTop - 80;

            window.scrollTo({
              top,
              behavior: "instant",
            });
          }

          window.history.replaceState(
            null,
            "",
            window.location.pathname,
          );

          return;
        }
      }

      if (isDesktop && lenis) {
        lenis.scrollTo(0, {
          immediate: true,
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
      }
    }, 20);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isDesktop, lenis]);
}