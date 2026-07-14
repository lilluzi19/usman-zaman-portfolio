"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import SectionTitle from "@/components/ui/SectionTitle";

type ContactMessageType =
  | "error"
  | "sending"
  | "success"
  | null;

type ContactMessageState = {
  text: string;
  type: ContactMessageType;
};

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const messageTimerRef = useRef<number | null>(null);

  const [contactMessage, setContactMessage] =
    useState<ContactMessageState>({
      text: "",
      type: null,
    });

  const [isMessageVisible, setIsMessageVisible] =
    useState(false);

  useEffect(() => {
    return () => {
      if (messageTimerRef.current) {
        window.clearTimeout(messageTimerRef.current);
      }
    };
  }, []);

  const showContactMessage = (
    text: string,
    type: Exclude<ContactMessageType, null>,
  ) => {
    setContactMessage({
      text,
      type,
    });

    setIsMessageVisible(true);

    if (messageTimerRef.current) {
      window.clearTimeout(messageTimerRef.current);
    }

    messageTimerRef.current = window.setTimeout(() => {
      setIsMessageVisible(false);
    }, 3500);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const form = formRef.current;

    if (!form) {
      return;
    }

    const formData = new FormData(form);

    const requiredValues = [
      formData.get("name"),
      formData.get("email"),
      formData.get("subject"),
      formData.get("message"),
    ];

    const isValid = requiredValues.every(
      (value) =>
        typeof value === "string" &&
        value.trim().length > 0,
    );

    if (!isValid) {
      showContactMessage(
        "Please complete all contact fields before sending.",
        "error",
      );

      return;
    }

    showContactMessage(
      "Sending your message...",
      "sending",
    );

    try {
      const response = await fetch(
        "https://formspree.io/f/mnjynwpl",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      showContactMessage(
        "Thank you. Your message has been sent successfully.",
        "success",
      );

      form.reset();
    } catch {
      showContactMessage(
        "Something went wrong. Please try again.",
        "error",
      );
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <SectionTitle label="Contact">
          Willing &amp; Eager
          <br />
          To Start
        </SectionTitle>

        <div className="contact-content">
          <div
            className="contact-info"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <span className="contact-label">
              Let&apos;s Talk
            </span>

            <h3>Open to Opportunities</h3>

            <p>
              I&apos;m actively seeking full-time junior roles. If
              you&apos;re looking for a developer or want to discuss
              a potential fit, I&apos;d be happy to connect.
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <i className="bi bi-envelope" />

                <div>
                  <span>Email</span>

                  <a href="mailto:usman.zaman@hotmail.com">
                    usman.zaman@hotmail.com
                  </a>
                </div>
              </div>

              <div className="contact-detail">
                <i className="bi bi-phone" />

                <div>
                  <span>Phone</span>

                  <a href="tel:+447798662531">
                    +44 7798 662 531
                  </a>
                </div>
              </div>

              <div className="contact-detail">
                <a
                  href="https://www.linkedin.com/in/usmanzaman19"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="bi bi-linkedin" />
                </a>

                <div>
                  <span>Social Link</span>
                  <p>LinkedIn</p>
                </div>
              </div>

              <div className="contact-detail">
                <a
                  href="https://github.com/lilluzi19"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <i className="bi bi-github" />
                </a>

                <div>
                  <span>Social Link</span>
                  <p>GitHub</p>
                </div>
              </div>

              <div
                id="contactMessage"
                className={`contact-message ${
                  isMessageVisible ? "show" : ""
                } ${contactMessage.type ?? ""}`}
                role="status"
                aria-live="polite"
              >
                {contactMessage.text}
              </div>
            </div>
          </div>

          <form
            ref={formRef}
            className="contact-form contact-message-form"
            noValidate
            data-aos="fade-left"
            data-aos-delay="300"
            onSubmit={handleSubmit}
          >
            <span className="contact-form-tag">
              Contact
            </span>

            <h3>Get In Touch</h3>

            <p>
              I&apos;m currently looking for full-time developer
              roles. If you&apos;re hiring or have an opportunity
              that fits my skill set, feel free to reach out.
            </p>

            <div className="contact-row">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                autoComplete="name"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                autoComplete="email"
                required
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
            />

            <textarea
              name="message"
              placeholder="Message..."
              required
            />

            <button type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}