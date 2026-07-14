"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const technologyBadges = [
  {
    className: "badge-html",
    src: "/images/hero/html.webp",
    alt: "HTML",
  },
  {
    className: "badge-css",
    src: "/images/hero/css.webp",
    alt: "CSS",
  },
  {
    className: "badge-js",
    src: "/images/hero/javascript.webp",
    alt: "JavaScript",
  },
  {
    className: "badge-react",
    src: "/images/hero/react.webp",
    alt: "React",
  },
  {
    className: "badge-nodejs",
    src: "/images/hero/nodejs.webp",
    alt: "NodeJS",
  },
  {
    className: "badge-postgresql",
    src: "/images/hero/postgresql.webp",
    alt: "PostgreSQL",
  },
];

export default function Hero() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [isScrollIndicatorHidden, setIsScrollIndicatorHidden] =
    useState(false);

  useEffect(() => {
    const video = heroVideoRef.current;

    if (!video) {
      return;
    }

    const playVideo = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;

      video.removeAttribute("controls");
      video.setAttribute("muted", "");
      video.setAttribute("autoplay", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");

      video.play().catch(() => {});
    };

    playVideo();

    window.addEventListener("load", playVideo);
    window.addEventListener("pageshow", playVideo);
    document.addEventListener("touchstart", playVideo, {
      once: true,
    });

    return () => {
      window.removeEventListener("load", playVideo);
      window.removeEventListener("pageshow", playVideo);
      document.removeEventListener("touchstart", playVideo);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollIndicatorHidden(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <video
        ref={heroVideoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero/hero-poster.webp"
        aria-hidden="true"
      >
        <source
          src="/videos/hero/hero-background.mp4"
          type="video/mp4"
        />
      </video>

      <div className="hero-overlay" />

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-tagline">Web Developer</span>

            <h1>
              Full-Stack Engineer Building Fast, Modern Web
              Applications
            </h1>

            <p>
              I build responsive web applications with a focus on
              clean UI, performance, and maintainable code using
              modern front-end and back-end technologies.
            </p>

            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary">
                Contact Me
              </a>

              <a href="#projects" className="btn btn-secondary">
                View Work
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="profile-wrapper">
              <Image
                src="/images/hero/usman.jpg"
                alt="Usman Zaman"
                width={500}
                height={500}
                priority
              />

              {technologyBadges.map((badge) => (
                <span
                  key={badge.alt}
                  className={`tech-badge ${badge.className}`}
                >
                  <Image
                    src={badge.src}
                    alt={badge.alt}
                    width={35}
                    height={35}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`scroll-down-indicator ${
          isScrollIndicatorHidden ? "scroll-hidden" : ""
        }`}
        aria-hidden="true"
      >
        <span>Scroll Down</span>
      </div>
    </section>
  );
}