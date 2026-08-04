import { useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
}

/** Small icon button that copies `value` to the clipboard and briefly confirms it worked. */
export default function CopyButton({ value, label = 'Copy', className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable (older browser, insecure context) — fail silently, no broken UI.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : label}
      className={`inline-flex items-center gap-1 rounded-md p-1 text-os-muted transition-colors hover:bg-os-accentSoft hover:text-os-accent ${className}`}
    >
      {copied ? <FiCheck className="h-3.5 w-3.5 text-os-accent" /> : <FiCopy className="h-3.5 w-3.5" />}
      {copied && <span className="font-mono text-xs text-os-accent">Copied</span>}
    </button>
  );
}
