"use client";

export function SocialBtn({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="glass inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-white hover:bg-white/10">
      {icon}
      {label}
    </button>
  );
}

export function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12S6.8 21.5 12 21.5c6.9 0 9.4-4.8 9.4-7.4 0-.5 0-.9-.1-1.3H12z"
      />
    </svg>
  );
}
