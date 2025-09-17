export function formatDateMonthYear(input: string, locale: "tr" | "en" = "en"): string {
  // Only parse reliably-structured dates. Otherwise, return as-is to avoid wrong months.
  const trimmed = input.trim();

  // ISO-like (YYYY-MM or YYYY-MM-DD)
  const isISO = /^\d{4}-\d{2}(-\d{2})?$/.test(trimmed);

  // English month formats we control
  const enMonthNames = "January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec";
  const isEnglishMonthYear = new RegExp(`^(?:${enMonthNames})(?:\\.)?\\s+\\d{4}$`, "i").test(trimmed);
  const isEnglishFull = new RegExp(`^(?:${enMonthNames})\\s+\\d{1,2},\\s*\\d{4}$`, "i").test(trimmed);

  if (isISO || isEnglishMonthYear || isEnglishFull) {
    const d = new Date(trimmed);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleString(locale === "tr" ? "tr-TR" : "en-US", {
        month: "short",
        year: "numeric",
      });
    }
  }

  // For Turkish free-form strings (e.g., "Eylül 2022"), show as provided.
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

