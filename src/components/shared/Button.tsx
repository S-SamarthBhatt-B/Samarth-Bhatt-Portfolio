import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'outline';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-os-accent text-black hover:bg-os-accentDim shadow-glowSm',
  ghost: 'text-os-text hover:bg-os-accentSoft',
  outline: 'border border-os-accent/40 text-os-accent hover:bg-os-accentSoft',
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-mono text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-os-accent disabled:opacity-50';

interface ButtonAsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button';
  variant?: Variant;
  children: ReactNode;
}

interface ButtonAsAnchor extends AnchorHTMLAttributes<HTMLAnchorElement> {
  as: 'a';
  variant?: Variant;
  children: ReactNode;
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export default function Button(props: ButtonProps) {
  const { variant = 'primary', className = '', children, ...rest } = props;
  const classes = `${baseClasses} ${VARIANT_CLASSES[variant]} ${className}`;

  if (props.as === 'a') {
    const { as: _as, ...anchorRest } = rest as ButtonAsAnchor;
    return (
      <a className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { as: _as, ...buttonRest } = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
