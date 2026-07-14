"use client";

import { useEffect, useRef } from "react";

type MobileNavigationProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navigationLinks = [
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Skills",
    href: "#skills",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export default function MobileNavigation({
  isOpen,
  onClose,
}: MobileNavigationProps) {
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-active", isOpen);

    return () => {
      document.body.classList.remove("mobile-nav-active");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!isOpen) {
        return;
      }

      const target = event.target as Node;

      if (drawerRef.current?.contains(target)) {
        return;
      }

      const burger = document.querySelector(".mobile-burger");

      if (burger?.contains(target)) {
        return;
      }

      onClose();
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <nav
      ref={drawerRef}
      className="mobile-nav-drawer"
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
    >
      <button
        className="mobile-nav-close"
        type="button"
        aria-label="Close menu"
        onClick={onClose}
      >
        <i className="bi bi-x-lg" />
      </button>

      <div className="mobile-nav-title">Navigation</div>

      <div className="mobile-nav-divider" />

      <ul>
        {navigationLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={onClose}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="mobile-nav-contact">
        <a href="mailto:usman.zaman@hotmail.com">
          <i className="bi bi-envelope" />
          <span>usman.zaman@hotmail.com</span>
        </a>

        <a href="tel:+447798662531">
          <i className="bi bi-phone" />
          <span>+44 7798 662 531</span>
        </a>

        <div className="mobile-nav-socials">
          <a
            href="https://www.linkedin.com/in/usmanzaman19"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="bi bi-linkedin" />
          </a>

          <a
            href="https://github.com/lilluzi19"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="bi bi-github" />
          </a>
        </div>
      </div>
    </nav>
  );
}