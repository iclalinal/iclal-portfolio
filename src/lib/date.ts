export function formatDateMonthYear(input: string, locale: "tr" | "en" = "en"): string {
  // Accept "MMM YYYY" or ISO date
  const trimmed = input.trim();
  const tryParse = new Date(trimmed);
  if (!Number.isNaN(tryParse.getTime())) {
    return tryParse.toLocaleString(locale === "tr" ? "tr-TR" : "en-US", {
      month: "short",
      year: "numeric",
    });
  }
  // Fallback: return as-is
  return trimmed;
}

export function formatDateRange(
  start: string,
  end: string | undefined,
  opts: { locale: "tr" | "en"; presentLabel?: string } = { locale: "en" }
): string {
  const { locale, presentLabel } = opts;
  const startStr = formatDateMonthYear(start, locale);
  const endStr = end ? formatDateMonthYear(end, locale) : presentLabel ?? (locale === "tr" ? "Güncel" : "Present");
  return `${startStr} – ${endStr}`;
}

