"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";

type ButtonLinkProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  delay?: number;
} & HTMLMotionProps<"button">;

export default function ButtonLink({
  href,
  label,
  variant = "primary",
  delay = 0.7,
  className,
  ...props
}: ButtonLinkProps) {
  const baseStyles =
    "px-6 py-3 font-semibold text-sm tracking-widest uppercase transition rounded shadow cursor-pointer hover:opacity-90";

  const variants = {
    primary: "bg-[#800000] text-white ",
    secondary:
      "border border-[#E6BE8A] text-[#228B22] hover:bg-[#800000] hover:text-white",
  };

  return (
    <Link href={href}>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
        className={clsx(baseStyles, variants[variant], className)}
        {...props}
      >
        {label}
      </motion.button>
    </Link>
  );
}
