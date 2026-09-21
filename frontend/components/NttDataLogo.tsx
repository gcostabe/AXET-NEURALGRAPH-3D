"use client";

import React from "react";

interface NttDataLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withBadge?: boolean;
  badgeText?: string;
}

export default function NttDataLogo({
  className = "",
  size = "md",
  withBadge = false,
  badgeText = "AI Knowledge Base",
}: NttDataLogoProps) {
  const heightClass = {
    sm: "h-6",
    md: "h-8",
    lg: "h-11",
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Imagem do logo oficial NTT DATA com container otimizado */}
      <div className="relative flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ntt-data-logo.png"
          alt="NTT DATA"
          className={`${heightClass} w-auto object-contain select-none drop-shadow-sm`}
        />
      </div>

      {withBadge && (
        <span className="hidden sm:inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-medium text-blue-300 backdrop-blur-sm">
          {badgeText}
        </span>
      )}
    </div>
  );
}
