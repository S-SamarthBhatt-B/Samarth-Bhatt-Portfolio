interface SectionHeadingProps {
  /** Terminal-flavored eyebrow, e.g. `$ about` — echoes the command that surfaces this content in Terminal mode. */
  command: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ command, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-4 sm:mb-6">
      <p className="mb-2 font-mono text-sm text-os-accent">
        <span className="text-os-muted">guest@samarthos:~$</span> {command}
      </p>
      <h2 className="font-display text-3xl font-semibold text-os-text sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-2 max-w-2xl text-os-muted">{subtitle}</p>}
    </div>
  );
}
