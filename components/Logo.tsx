import React from "react";

type LogoProps = {
  /** Show the "Endüstriyel Zemin Sistemleri" micro-label under the wordmark. */
  showTagline?: boolean;
  /** Visual size of the wordmark. */
  size?: "sm" | "md";
  className?: string;
};

/**
 * Traffic Floor brand wordmark — pure typographic solution (no icon, no box).
 * "TRAFFIC" in white, "FLOOR" in the brand orange. Uses the display font
 * (Space Grotesk) with tight letter spacing for an industrial feel.
 */
export default function Logo({
  showTagline = true,
  size = "md",
  className = "",
}: LogoProps) {
  const wordmarkSize = size === "md" ? "text-xl" : "text-base";

  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="flex items-baseline gap-1.5">
        <span className={`font-display font-black ${wordmarkSize} tracking-tight text-white`}>
          TRAFFIC
        </span>
        <span className={`font-display font-medium ${wordmarkSize} tracking-tight text-[#f97316]`}>
          FLOOR
        </span>
      </span>
      {showTagline && (
        <span className="text-[8px] font-mono tracking-widest text-[#f97316] uppercase mt-0.5 group-hover:text-white transition-colors">
          Endüstriyel Zemin Sistemleri
        </span>
      )}
    </span>
  );
}
