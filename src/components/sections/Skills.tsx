import Image from "next/image";

import { skills } from "@/data/skills";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <SectionTitle label="Skills">
          Technologies &amp;
          <br />
          Tools I Use
        </SectionTitle>

        <div className="skills-grid">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="skills-card-wrapper"
              data-aos="fade-up"
              data-aos-delay={skill.aosDelay}
            >
              <article className="skills-card">
                <span
                  className="skills-number"
                  aria-hidden="true"
                >
                  {skill.number}
                </span>

                <div className="skills-icon">
                  <Image
                    src={skill.image}
                    alt={skill.alt}
                    width={38}
                    height={38}
                  />
                </div>

                <h3>{skill.name}</h3>

                <p>{skill.description}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}