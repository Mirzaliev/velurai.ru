"use client";

export function SocialBtn({
  icon,
  label,
  onClick,
  disabled,
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="glass inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 disabled:opacity-70"
    >
      {icon}
      {loading ? "Подождите…" : label}
    </button>
  );
}

export function YandexIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path fill="#FC3F1D" d="M12.014 2h3.048v20h-2.987v-13.7l-4.32 5.48h-2.66l4.35-5.55c-1.41-1.76-2.55-3.26-4.17-3.26H4.014V22h3.12V9.13l5.14-6.54c-.26-.59-.26-.59-.26-.59z" />
    </svg>
  );
}
