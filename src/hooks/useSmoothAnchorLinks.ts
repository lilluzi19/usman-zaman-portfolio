"use client";

import { useEffect } from "react";

import { useLenisContext } from "@/components/ui/AppProviders";

export default function useSmoothAnchorLinks() {
  const { lenis, isDesktop } = useLenisContext();

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;

      const link = clickedElement.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );

      if (!link) {
        return;
      }

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target =
        document.querySelector<HTMLElement>(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      document.body.classList.remove("mobile-nav-active");

      if (isDesktop && lenis) {
        const offset =
          targetId === "#contact" ? -80 : -75;

        lenis.scrollTo(target, {
          offset,
          duration: 1.25,
        });
      } else {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      window.history.replaceState(
        null,
        "",
        window.location.pathname,
      );
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener(
        "click",
        handleAnchorClick,
      );
    };
  }, [isDesktop, lenis]);
}