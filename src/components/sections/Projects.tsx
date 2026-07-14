"use client";

import {
  MouseEvent,
  useEffect,
  useRef,
} from "react";

import { projects } from "@/data/projects";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Projects() {
  const featuredVideoRef = useRef<HTMLVideoElement>(null);
  const projectVideoRefs = useRef<
    Array<HTMLVideoElement | null>
  >([]);

  useEffect(() => {
  const configureProjectVideos = () => {
    const isMobile = window.innerWidth <= 1024;

    projectVideoRefs.current.forEach(
      (video, index) => {
        if (!video) {
          return;
        }

        video.muted = true;
        video.defaultMuted = true;
        video.loop = true;
        video.playsInline = true;

        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        video.setAttribute(
          "webkit-playsinline",
          "",
        );

        if (isMobile) {
          video.autoplay = true;
          video.setAttribute("autoplay", "");

          video.play().catch(() => {});

          return;
        }

        if (!projects[index].featured) {
          video.pause();
          video.currentTime = 0;
        }
      },
    );
  };

  const handleFirstTouch = () => {
    configureProjectVideos();
  };

  configureProjectVideos();

  window.addEventListener(
    "portfolio:ready",
    configureProjectVideos,
  );

  window.addEventListener(
    "resize",
    configureProjectVideos,
  );

  window.addEventListener(
    "touchstart",
    handleFirstTouch,
    {
      once: true,
      passive: true,
    },
  );

  return () => {
    window.removeEventListener(
      "portfolio:ready",
      configureProjectVideos,
    );

    window.removeEventListener(
      "resize",
      configureProjectVideos,
    );

    window.removeEventListener(
      "touchstart",
      handleFirstTouch,
    );
  };
}, []);

  const handleMouseEnter = (
    event: MouseEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    if (window.innerWidth <= 1024) {
      return;
    }

    const project = projects[index];

    if (project.featured) {
      return;
    }

    const video = event.currentTarget.querySelector(
      ".project-video",
    ) as HTMLVideoElement | null;

    featuredVideoRef.current?.pause();

    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = (
    event: MouseEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    if (window.innerWidth <= 1024) {
      return;
    }

    const project = projects[index];

    if (project.featured) {
      return;
    }

    const video = event.currentTarget.querySelector(
      ".project-video",
    ) as HTMLVideoElement | null;

    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    featuredVideoRef.current?.play().catch(() => {});
  };

  return (
    <section className="projects" id="projects">
      <div className="container">
        <SectionTitle label="Projects">
          Selected Work
          <br />
          That Shows What I Can Build
        </SectionTitle>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card-wrapper ${
                project.featured
                  ? "featured-project-wrapper"
                  : ""
              }`}
              data-aos={
                project.featured ? "fade-right" : "fade-left"
              }
              data-aos-delay="300"
            >
              <a
                href={project.href || "#"}
                target={
                  project.href ? "_blank" : undefined
                }
                rel={
                  project.href
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`project-card ${
                  project.featured
                    ? "featured-project"
                    : "project-hover-video-card"
                }`}
                onClick={(event) => {
                  if (!project.href) {
                    event.preventDefault();
                  }
                }}
                onMouseEnter={(event) =>
                  handleMouseEnter(event, index)
                }
                onMouseLeave={(event) =>
                  handleMouseLeave(event, index)
                }
              >
                <div className="project-image">
                  <video
                    ref={(element) => {
                      projectVideoRefs.current[index] = element;

                      if (project.featured) {
                        featuredVideoRef.current = element;
                      }
                    }}
                    className={`project-video ${
                      project.featured
                        ? "featured-project-video"
                        : ""
                    }`}
                    autoPlay={project.featured}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source
                      src={project.video}
                      type="video/mp4"
                    />
                  </video>
                </div>

                <div className="project-content">
                  <span>{project.category}</span>

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <div className="project-meta">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}