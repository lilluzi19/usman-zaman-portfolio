import type { Metadata } from "next";
import { Sora } from "next/font/google";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";

import "@/styles/globals.scss";

import "lenis/dist/lenis.css";

import { SpeedInsights } from "@vercel/speed-insights/next";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usmanzaman.com"),

  title: {
    default: "Usman Zaman | Full-Stack Engineer",
    template: "%s | Usman Zaman",
  },

  description:
    "Full-stack web developer focused on building fast, responsive and well-structured web applications with modern UI, clean code and scalable architecture.",

  applicationName: "Usman Zaman Portfolio",

  authors: [
    {
      name: "Usman Zaman",
      url: "https://usmanzaman.com",
    },
  ],

  creator: "Usman Zaman",
  publisher: "Usman Zaman",

  keywords: [
    "Usman Zaman",
    "Full-Stack Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer UK",
    "Portfolio",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Usman Zaman | Full-Stack Engineer",

    description:
      "Full-stack engineer building fast, responsive web applications with modern UI, clean code and scalable architecture.",

    url: "/",
    siteName: "Usman Zaman",
    locale: "en_GB",
    type: "website",

    images: [
      {
        url: "/images/icons/logo1.png",
        width: 1200,
        height: 630,
        alt: "Usman Zaman Full-Stack Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Usman Zaman | Full-Stack Engineer",

    description:
      "Full-stack engineer building fast, responsive web applications with modern UI, clean code and scalable architecture.",

    images: ["/images/icons/logo1.png"],
  },

  icons: {
    icon: "/images/icons/logo1.png",
    shortcut: "/images/icons/logo1.png",
    apple: "/images/icons/logo1.png",
  },

  category: "technology",
};

const themeScript = `
(function () {
  try {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme || systemTheme
    );
  } catch {}
})();
`;

const initialBackgroundStyles = `
  html,
  body {
    margin: 0;
    background-color: #f0efee;
  }

  html[data-theme="dark"],
  html[data-theme="dark"] body {
    background-color: #1a1a1a;
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html,
              body {
                margin: 0;
                background-color: #f0efee;
              }

              @media (prefers-color-scheme: dark) {
                html:not([data-theme="light"]),
                html:not([data-theme="light"]) body {
                  background-color: #1a1a1a;
                }
              }

              html[data-theme="dark"],
              html[data-theme="dark"] body {
                background-color: #1a1a1a;
              }

              html[data-theme="light"],
              html[data-theme="light"] body {
                background-color: #f0efee;
              }
            `,
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var savedTheme = localStorage.getItem("theme");

                  var systemTheme = window.matchMedia(
                    "(prefers-color-scheme: dark)"
                  ).matches
                    ? "dark"
                    : "light";

                  document.documentElement.setAttribute(
                    "data-theme",
                    savedTheme || systemTheme
                  );
                } catch (error) {}
              })();
            `,
          }}
        />
      </head>

      <body
        className={`${sora.className} ${sora.variable} index-page preloader-active`}
      >
        {children}

        <SpeedInsights />
      </body>
    </html>
  );
}