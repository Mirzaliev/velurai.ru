"use client";

import type React from "react";

export function Field({
  icon: Icon,
  label,
  trailing,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  trailing?: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium text-white/70">{label}</span>
        {trailing}
      </div>
      <div className="group relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 group-focus-within:text-white/80" />
        <input
          {...props}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-10 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-white/30 focus:bg-white/[0.06]"
        />
      </div>
    </label>
  );
}
