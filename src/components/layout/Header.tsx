"use client";

import Image from "next/image";
import {
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import MobileNavigation from "@/components/layout/MobileNavigation";
import ThemeToggle from "@/components/ui/ThemeToggle";

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

export default function Header() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const closeMobileNavigation = useCallback(() => {
    setIsMobileNavOpen(false);
  }, []);

  useEffect(() => {
    const updateHeader = () => {
      setIsShrunk(window.scrollY > 10);
    };

    window.addEventListener("scroll", updateHeader, {
      passive: true,
    });

    updateHeader();

    return () => {
      window.removeEventListener("scroll", updateHeader);
    };
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const sections = document.querySelectorAll<HTMLElement>(
        "main section[id]",
      );

      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 160;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionBottom
        ) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  const handleMagneticMove = (
    event: ReactMouseEvent<HTMLAnchorElement>,
  ) => {
    if (window.innerWidth <= 992) {
      return;
    }

    const link = event.currentTarget;
    const rect = link.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    link.style.transition =
      "color 0.4s ease, transform 0.25s ease-out";

    link.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMagneticLeave = (
    event: ReactMouseEvent<HTMLAnchorElement>,
  ) => {
    const link = event.currentTarget;

    link.style.transition =
      "color 0.4s ease, transform 0.35s ease";

    link.style.transform = "translate(0, 0)";
  };

  return (
    <>
      <header
        id="header"
        className={`header sticky-top ${
          isShrunk ? "header-shrink" : ""
        }`}
      >
        <div className="topbar">
          <div className="container d-flex align-items-center justify-content-between">
            <div className="topbar-socials d-flex align-items-center">
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

            <div className="topbar-contact d-flex align-items-center">
              <a href="mailto:usman.zaman@hotmail.com">
                <i className="bi bi-envelope" />
                <span>usman.zaman@hotmail.com</span>
              </a>

              <a href="tel:+447798662531">
                <i className="bi bi-phone" />
                <span>+44 7798 662 531</span>
              </a>
            </div>
          </div>
        </div>

        <div className="main-header">
          <div className="container header-inner">
            <button
              className="mobile-burger"
              type="button"
              aria-label="Open menu"
              aria-expanded={isMobileNavOpen}
              onClick={(event) => {
                event.stopPropagation();
                setIsMobileNavOpen(true);
              }}
            >
              <span />
              <span />
              <span />
            </button>

            <a href="#hero" className="logo" id="logo">
              <Image
                src="/images/icons/logo.webp"
                alt="Usman Zaman Logo"
                width={150}
                height={150}
                priority
              />
            </a>

            <nav
              id="navmenu"
              className="navmenu"
              aria-label="Primary navigation"
            >
              <ul>
                {navigationLinks.map((link) => {
                  const sectionId = link.href.replace("#", "");

                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className={
                          activeSection === sectionId ? "active" : ""
                        }
                        onMouseMove={handleMagneticMove}
                        onMouseLeave={handleMagneticLeave}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <ThemeToggle />
          </div>
        </div>
      </header>

      <MobileNavigation
        isOpen={isMobileNavOpen}
        onClose={closeMobileNavigation}
      />
    </>
  );
}