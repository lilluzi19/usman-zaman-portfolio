type SectionTitleProps = {
  label: string;
  children: React.ReactNode;
};

export default function SectionTitle({
  label,
  children,
}: SectionTitleProps) {
  return (
    <div
      className="section-title"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <span>{label}</span>

      <h2>{children}</h2>
    </div>
  );
}