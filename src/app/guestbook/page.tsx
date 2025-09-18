"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { m } from "framer-motion";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BRIDGE_BASE = (process.env.BRIDGE_BASE ?? "").replace(/\/$/, "");
const BRIDGE_TOKEN = process.env.BRIDGE_TOKEN ?? "";

const LIMITS = {
  firstName: 80,
  lastName: 80,
  displayName: 120,
  email: 190,
  message: 2000,
} as const;

type BridgeEntry = {
  display_name: string;
  message: string;
  created_at: string;
};

type Entry = {
  displayName: string;
  message: string;
  createdAt: string;
};

type FormState = {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  message: string;
  website: string;
};

type FeedbackKey = "success" | "error" | "invalidEmail" | "required" | "messageTooLong";

type Feedback =
  | { type: "success"; key: FeedbackKey }
  | { type: "error"; key: FeedbackKey }
  | { type: "error"; message: string };

const DEFAULT_FORM: FormState = {
  firstName: "",
  lastName: "",
  displayName: "",
  email: "",
  message: "",
  website: "",
};

const INSERT_URL = BRIDGE_BASE && BRIDGE_TOKEN
  ? `${BRIDGE_BASE}/guestbook_insert.php?token=${encodeURIComponent(BRIDGE_TOKEN)}`
  : null;
const LIST_URL = BRIDGE_BASE ? `${BRIDGE_BASE}/guestbook_list.php` : null;

export default function GuestbookPage() {
  const { c, lang } = useI18n();
  const [form, setForm] = useState<FormState>({ ...DEFAULT_FORM });
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [csrfToken, setCsrfToken] = useState<string>("");

  const locale = useMemo(() => (lang === "tr" ? "tr-TR" : "en-US"), [lang]);

  // Fetch CSRF token from server
  const fetchCSRFToken = useCallback(async () => {
    if (!BRIDGE_BASE) return;
    
    try {
      const response = await fetch(`${BRIDGE_BASE}/csrf_token.php`, {
        method: 'GET',
        credentials: 'include', // Include cookies for double-submit pattern
        cache: 'no-store'
      });
      
      if (response.ok) {
        const data = await response.json();
        setCsrfToken(data.token || '');
      } else {
        console.error('Failed to fetch CSRF token');
        setCsrfToken('');
      }
    } catch (error) {
      console.error('CSRF token fetch error:', error);
      setCsrfToken('');
    }
  }, []);

  useEffect(() => {
    if (BRIDGE_BASE) {
      fetchCSRFToken();
    }
  }, [fetchCSRFToken]);

  const formatDate = useCallback(
    (value: string) => {
      try {
        return new Date(value).toLocaleString(locale, {
          dateStyle: "medium",
          timeStyle: "short",
        });
      } catch {
        return value;
      }
    },
    [locale]
  );

  const fetchEntries = useCallback(async () => {
    if (!LIST_URL) {
      setFetchError(c.guestbook.list.fetchError);
      return;
    }
    setIsFetching(true);
    setFetchError(null);
    try {
      const res = await fetch(LIST_URL, { cache: "no-store" });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setEntries([]);
        setFetchError(data?.error ?? c.guestbook.list.fetchError);
        return;
      }
      const data = (await res.json()) as BridgeEntry[];
      const mapped: Entry[] = Array.isArray(data)
        ? data.map((item) => ({
            displayName: item.display_name,
            message: item.message,
            createdAt: item.created_at,
          }))
        : [];
      setEntries(mapped);
    } catch (error) {
      console.error("[guestbook][fetch]", error);
      setFetchError(c.guestbook.list.fetchError);
    } finally {
      setIsFetching(false);
    }
  }, [c.guestbook.list.fetchError]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleChange = (key: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!form.firstName.trim() || !form.lastName.trim() || !form.displayName.trim() || !form.email.trim() || !form.message.trim()) {
      return { type: "error", key: "required" } as Feedback;
    }

    if (!EMAIL_REGEX.test(form.email.trim())) {
      return { type: "error", key: "invalidEmail" } as Feedback;
    }

    if (form.message.trim().length > LIMITS.message) {
      return { type: "error", key: "messageTooLong" } as Feedback;
    }

    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    if (!INSERT_URL) {
      setFeedback({ type: "error", message: c.guestbook.form.error });
      return;
    }

    const validationError = validate();
    if (validationError) {
      setFeedback(validationError);
      return;
    }

    if (form.website.trim().length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        first_name: form.firstName.trim().slice(0, LIMITS.firstName),
        last_name: form.lastName.trim().slice(0, LIMITS.lastName),
        display_name: form.displayName.trim().slice(0, LIMITS.displayName),
        email: form.email.trim().slice(0, LIMITS.email),
        message: form.message.slice(0, LIMITS.message),
        csrf_token: csrfToken,
      };

      const res = await fetch(INSERT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include CSRF cookie
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setFeedback(data?.error ? { type: "error", message: data.error } : { type: "error", key: "error" });
        return;
      }

      setFeedback({ type: "success", key: "success" });
      setForm({ ...DEFAULT_FORM });
      fetchEntries();
    } catch (error) {
      console.error("[guestbook][submit]", error);
      setFeedback({ type: "error", key: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const feedbackText = feedback
    ? "message" in feedback
      ? feedback.message
      : c.guestbook.form[feedback.key]
    : null;

  const bridgeWarning = !BRIDGE_BASE || !BRIDGE_TOKEN;

  return (
    <div className="relative min-h-screen bg-slate-900 text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800/50" />
        <m.div
          className="absolute top-1/4 left-1/5 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          className="absolute bottom-1/5 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        />
      </div>

      <NavBar />

      <main className="relative z-10 pt-32 pb-24 px-5">
        <section className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{c.guestbook.title}</h1>
            <p className="mt-4 text-slate-300 text-lg leading-relaxed">{c.guestbook.intro}</p>
            {bridgeWarning ? (
              <p className="mt-2 text-sm text-red-300">
                {lang === "tr"
                  ? "Köprü yapılandırması eksik. BRIDGE_BASE ve BRIDGE_TOKEN ortam değişkenlerini ayarlayın."
                  : "Bridge configuration is missing. Please set BRIDGE_BASE and BRIDGE_TOKEN environment variables."}
              </p>
            ) : null}
          </div>

          <m.form
            onSubmit={handleSubmit}
            className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-10 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={form.firstName}
                onChange={handleChange("firstName")}
                placeholder={c.guestbook.form.firstNamePlaceholder}
                maxLength={LIMITS.firstName}
                autoComplete="given-name"
                className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                required
              />
              <input
                value={form.lastName}
                onChange={handleChange("lastName")}
                placeholder={c.guestbook.form.lastNamePlaceholder}
                maxLength={LIMITS.lastName}
                autoComplete="family-name"
                className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                required
              />
              <input
                value={form.displayName}
                onChange={handleChange("displayName")}
                placeholder={c.guestbook.form.displayNamePlaceholder}
                maxLength={LIMITS.displayName}
                autoComplete="nickname"
                className="md:col-span-2 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                required
              />
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                placeholder={c.guestbook.form.emailPlaceholder}
                maxLength={LIMITS.email}
                autoComplete="email"
                className="md:col-span-2 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                required
              />
              <textarea
                value={form.message}
                onChange={handleChange("message")}
                placeholder={c.guestbook.form.messagePlaceholder}
                maxLength={LIMITS.message}
                rows={5}
                className="md:col-span-2 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                required
              />
              <input
                type="text"
                value={form.website}
                onChange={handleChange("website")}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:from-cyan-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "..." : c.guestbook.form.submit}
              </button>

              {feedbackText ? (
                <span className={`text-sm ${feedback?.type === "success" ? "text-cyan-300" : "text-red-300"}`}>
                  {feedbackText}
                </span>
              ) : null}
            </div>
          </m.form>

          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                {c.guestbook.list.title}
              </h2>
              <button
                type="button"
                onClick={fetchEntries}
                disabled={isFetching}
                className="text-xs font-semibold text-cyan-300 hover:text-white transition-colors disabled:opacity-60"
              >
                {isFetching ? "..." : lang === "tr" ? "Yenile" : "Refresh"}
              </button>
            </div>

            {fetchError ? (
              <p className="text-sm text-red-300">{fetchError}</p>
            ) : entries.length === 0 ? (
              <p className="text-sm text-slate-400">{c.guestbook.list.empty}</p>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <div
                    key={`${entry.displayName}-${entry.createdAt}`}
                    className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-base font-semibold text-white">{entry.displayName}</span>
                      <span className="text-xs text-slate-400">{formatDate(entry.createdAt)}</span>
                    </div>
                    <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">{entry.message}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}
