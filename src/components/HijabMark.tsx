export function HijabMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 120" fill="none" className={className} aria-hidden="true">
      {/* outer hijab drape */}
      <path
        d="M45 6c19 0 31 15 31 36 0 12-3 20-3 30 0 16 5 30 12 42-14 4-27 6-40 6-16 0-27-4-33-13-6-9-7-22-5-38 1-8 2-14 2-22C9 22 24 6 45 6Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M45 6c19 0 31 15 31 36 0 12-3 20-3 30 0 16 5 30 12 42-14 4-27 6-40 6-16 0-27-4-33-13-6-9-7-22-5-38 1-8 2-14 2-22C9 22 24 6 45 6Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      {/* face opening */}
      <path
        d="M56 30c-11 1-19 8-21 19-2 12 2 22 10 29"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* soft fold */}
      <path
        d="M22 62c6 8 14 13 24 15"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
