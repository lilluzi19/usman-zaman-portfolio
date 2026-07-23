import Image from "next/image";

const footerLinkGroups = [
  {
    title: "Explore",
    links: [
      {
        label: "Projects",
        href: "#projects",
      },
      {
        label: "Skills",
        href: "#skills",
      },
    ],
  },
  {
    title: "Quick Links",
    links: [
      {
        label: "About",
        href: "#about",
      },
      {
        label: "Contact",
        href: "#contact",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <a
                href="#hero"
                className="footer-logo"
                aria-label="Return to the top"
              >
                <Image
                  src="/images/icons/logo.webp"
                  alt="Usman Zaman Logo"
                  width={85}
                  height={85}
                />
              </a>

              <div>
                <h4>
                  Front-End Engineer Building Fast, Modern Web
                  Applications
                </h4>

                <p>
                  I build responsive web applications with a focus on
                  clean UI, performance, and maintainable code using
                  modern front-end and back-end technologies.
                </p>
              </div>
            </div>

            {footerLinkGroups.map((group) => (
              <div className="footer-links" key={group.title}>
                <h4>{group.title}</h4>

                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="footer-socials">
              <h4>Social Links</h4>

              <div>
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
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          <p>© Copyright Usman Zaman. All Rights Reserved</p>

          <div className="credits">
            <p>
              <span>Designed &amp; Created By </span>

              <a
                href="https://usmanzaman.com"
                target="_blank"
                rel="noopener noreferrer"
                className="usman"
              >
                Usman Zaman
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}