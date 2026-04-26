/* ── SVG / Icon helpers ── */
export default function CornerSVG() {
  return (
    <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4 56L4 4L56 4" strokeDasharray="200"/>
      <path d="M4 30 Q18 18 30 4"/>
      <circle cx="4" cy="4" r="3" fill="currentColor" stroke="none"/>
      <circle cx="4" cy="56" r="2" fill="currentColor" stroke="none" opacity=".3"/>
      <circle cx="56" cy="4" r="2" fill="currentColor" stroke="none" opacity=".3"/>
    </svg>
  );
}