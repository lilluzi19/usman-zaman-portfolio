const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",

  name: "Usman Zaman",
  jobTitle: "Full-Stack Engineer",

  url: "https://usmanzaman.com",

  image: "https://usmanzaman.com/images/icons/logo.webp",

  email: "mailto:usman.zaman@hotmail.com",
  telephone: "+447798662531",

  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
  },

  sameAs: [
    "https://www.linkedin.com/in/usmanzaman19",
    "https://github.com/lilluzi19",
  ],

  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Greenwich",
  },

  knowsAbout: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "SCSS",
    "Bootstrap",
    "PHP",
    "MySQL",
    "Responsive Web Development",
    "Frontend Development",
    "Full-Stack Development",
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personStructuredData).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}