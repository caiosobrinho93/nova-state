export function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      className={down ? "arrow arrow--down" : "arrow"}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M12 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}
