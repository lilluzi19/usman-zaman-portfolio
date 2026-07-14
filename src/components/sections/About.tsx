import Image from "next/image";

import SectionTitle from "@/components/ui/SectionTitle";

const aboutPoints = [
  {
    title: "First-Class",
    description: "Honours Degree",
  },
  {
    title: "Full-Stack",
    description: "Development",
  },
  {
    title: "Clean Code",
    description: "Modern Practices",
  },
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <SectionTitle label="About">
          The Person
          <br />
          Behind The Work
        </SectionTitle>

        <div className="about-content">
          <div
            className="about-image-wrapper"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <div className="about-image">
              <Image
                src="/images/hero/usman.jpg"
                alt="Usman Zaman"
                width={700}
                height={900}
              />
            </div>
          </div>

          <div
            className="about-text"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <span className="about-label">
              First-Class Honours Graduate
            </span>

            <h3>
              I&apos;m Usman, A Full-Stack Engineer, Passionate About
              Building Modern Web Applications
            </h3>

            <p>
              I graduated with a First-Class Honours in BSc Business
              Computing from the University of Greenwich in 2025.
              Since then, I&apos;ve continued developing my skills by
              building modern, responsive web applications that
              prioritise clean code, performance and intuitive user
              experiences.
            </p>

            <p>
              I enjoy turning ideas into reliable, well-structured
              software by carefully planning each project, writing
              maintainable code and creating interfaces that are both
              functional and easy to use. I&apos;m always looking to
              improve as a developer and contribute to meaningful
              products as part of a collaborative team.
            </p>

            <div className="about-points">
              {aboutPoints.map((point) => (
                <div key={point.title}>
                  <strong>{point.title}</strong>
                  <span>{point.description}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="about-btn">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}