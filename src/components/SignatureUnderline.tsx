"use client";
import { useId } from "react";

export default function SignatureUnderline() {
  const id = useId(); // unique clipPath id
  return (
    <svg aria-hidden="true" className="w-full max-w-xs" viewBox="0 0 320 24">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#35C6F4" />
          <stop offset="100%" stopColor="#B8FF6A" />
        </linearGradient>
      </defs>
      <path
        d="M2 18 C 80 8, 140 22, 318 10"
        fill="none"
        stroke={`url(#grad-${id})`}
        strokeWidth="3"
        strokeLinecap="round"
        className="animate-[underline_1.2s_ease-out_forwards] [stroke-dasharray:360] [stroke-dashoffset:360]"
      />
    </svg>
  );
}
