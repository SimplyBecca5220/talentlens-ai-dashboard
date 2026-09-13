import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "warning";
};

const variants = {
  primary: "bg-ink text-surface hover:bg-ink/90",
  secondary: "border border-line bg-surface text-ink hover:bg-paper",
  ghost: "text-sub hover:bg-paper hover:text-ink",
  warning: "border border-warm/25 bg-warm/10 text-warm hover:bg-warm/15",
};

export function Button({ className = "", variant = "secondary", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}