"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import Lenis from "lenis";

type LenisContextValue = {
  lenis: Lenis | null;
  isDesktop: boolean;
};

type AppProvidersProps = {
  children: ReactNode;
};

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  isDesktop: false,
});

export function useLenisContext() {
  return useContext(LenisContext);
}

export default function AppProviders({
  children,
}: AppProvidersProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const frameRef = useRef<number | null>(null);

  const [lenisInstance, setLenisInstance] =
    useState<Lenis | null>(null);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia(
      "(min-width: 1024px)",
    );

    const destroyLenis = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      lenisRef.current?.destroy();
      lenisRef.current = null;

      setLenisInstance(null);
    };

    const createLenis = () => {
      if (!desktopQuery.matches || lenisRef.current) {
        return;
      }

      const instance = new Lenis({
        duration: 1.25,
        smoothWheel: true,
        syncTouch: false,
      });

      if (
        document.body.classList.contains(
          "preloader-active",
        )
      ) {
        instance.stop();
      }

      lenisRef.current = instance;
      setLenisInstance(instance);

      const animate = (time: number) => {
        lenisRef.current?.raf(time);

        frameRef.current =
          window.requestAnimationFrame(animate);
      };

      frameRef.current =
        window.requestAnimationFrame(animate);
    };

    const updateViewport = () => {
      const desktop = desktopQuery.matches;

      setIsDesktop(desktop);

      if (desktop) {
        createLenis();
      } else {
        destroyLenis();
      }
    };

    const handlePortfolioReady = () => {
      const instance = lenisRef.current;

      if (!instance || !desktopQuery.matches) {
        return;
      }

      instance.start();
      instance.resize();

      if (!window.location.hash) {
        instance.scrollTo(0, {
          immediate: true,
        });
      }
    };

    updateViewport();

    desktopQuery.addEventListener(
      "change",
      updateViewport,
    );

    window.addEventListener(
      "portfolio:ready",
      handlePortfolioReady,
    );

    return () => {
      desktopQuery.removeEventListener(
        "change",
        updateViewport,
      );

      window.removeEventListener(
        "portfolio:ready",
        handlePortfolioReady,
      );

      destroyLenis();
    };
  }, []);

  return (
    <LenisContext.Provider
      value={{
        lenis: lenisInstance,
        isDesktop,
      }}
    >
      {children}
    </LenisContext.Provider>
  );
}