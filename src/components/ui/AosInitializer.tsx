"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AosInitializer() {
  useEffect(() => {
    let hasInitialisedDesktopAos = false;

    const initialiseAos = () => {
      const isMobileOrTablet =
        window.innerWidth <= 1024;

      if (isMobileOrTablet) {
        document.body.classList.add(
          "aos-disabled-mobile",
        );

        document
          .querySelectorAll<HTMLElement>("[data-aos]")
          .forEach((element) => {
            element.classList.add("aos-animate");
            element.style.opacity = "1";
            element.style.transform = "none";
          });

        return;
      }

      document.body.classList.remove(
        "aos-disabled-mobile",
      );

      if (!hasInitialisedDesktopAos) {
        AOS.init({
          duration: 650,
          easing: "ease-in-out",
          once: false,
          mirror: false,
          offset: 80,
        });

        hasInitialisedDesktopAos = true;
      }

      AOS.refreshHard();
    };

    const handleResize = () => {
      if (
        document.body.classList.contains(
          "preloader-active",
        )
      ) {
        return;
      }

      initialiseAos();
    };

    window.addEventListener(
      "portfolio:ready",
      initialiseAos,
    );

    window.addEventListener("resize", handleResize);

    if (
      !document.body.classList.contains(
        "preloader-active",
      )
    ) {
      initialiseAos();
    }

    return () => {
      window.removeEventListener(
        "portfolio:ready",
        initialiseAos,
      );

      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, []);

  return null;
}