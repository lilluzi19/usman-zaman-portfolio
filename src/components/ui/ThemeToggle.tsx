"use client";

import { useEffect, useRef } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const transitionTimer = useRef<number | null>(null);

  useEffect(() => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";

    buttonRef.current?.setAttribute(
      "aria-pressed",
      String(isDark),
    );

    return () => {
      if (transitionTimer.current !== null) {
        window.clearTimeout(transitionTimer.current);
      }
    };
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;

    html.classList.add("theme-changing");

    const nextTheme: Theme =
      html.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";

    html.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);

    buttonRef.current?.setAttribute(
      "aria-pressed",
      String(nextTheme === "dark"),
    );

    if (transitionTimer.current !== null) {
      window.clearTimeout(transitionTimer.current);
    }

    transitionTimer.current = window.setTimeout(() => {
      html.classList.remove("theme-changing");
    }, 800);
  };

  return (
    <button
      ref={buttonRef}
      id="theme-toggle"
      className="theme-switch"
      type="button"
      aria-label="Toggle dark mode"
      aria-pressed="false"
      onClick={toggleTheme}
    >
      <span className="switch-bg">
        <span className="sun" />
        <span className="moon" />
      </span>
    </button>
  );
}