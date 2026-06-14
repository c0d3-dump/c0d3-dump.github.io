interface SectionHeadingProps {
  terminalLabel: string;
  title: string;
}

export default function SectionHeading({
  terminalLabel,
  title,
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-heading__terminal">{terminalLabel}</div>
      <h2 className="section-heading__title">{title}</h2>
    </div>
  );
}
