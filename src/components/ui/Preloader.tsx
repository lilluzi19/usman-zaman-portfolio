"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [isHidden, setIsHidden] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    const hideTimer = window.setTimeout(() => {
      setIsHidden(true);

      document.body.classList.remove("preloader-active");

      window.dispatchEvent(
        new CustomEvent("portfolio:ready"),
      );

      window.dispatchEvent(new Event("resize"));
    }, 1500);

    const removeTimer = window.setTimeout(() => {
      setIsRemoved(true);
    }, 3600);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (isRemoved) {
    return null;
  }

  return (
    <div
      id="preloader"
      className={isHidden ? "hide" : ""}
      aria-hidden={isHidden}
    >
      <div className="preloader-inner">
        <div className="preloader-code">
          <span>&lt;</span>
          <span>/</span>
          <span>&gt;</span>
        </div>

        <h1>Usman Zaman</h1>

        <p>Front-End Engineer</p>

        <div className="preloader-line">
          <span />
        </div>

        <small>Building your experience...</small>
      </div>
    </div>
  );
}