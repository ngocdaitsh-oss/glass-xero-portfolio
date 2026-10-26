export function ThinkingDots({ label }: { label: string }) {
  return (
    <span role="status" aria-label={label} className="inline-flex h-6 items-center gap-1">
      <span aria-hidden className="term-thinking-dot" />
      <span aria-hidden className="term-thinking-dot" />
      <span aria-hidden className="term-thinking-dot" />
    </span>
  );
}
