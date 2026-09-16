"use client";

import { useState, type FormEvent } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

// Subject dropdown options — README §Contact Page Contact Form fields
const CONTACT_SUBJECTS = [
  "General Enquiry",
  "Research Collaboration",
  "Partnership Opportunity",
  "Media / Press",
  "Technical Support",
] as const;

type Subject = (typeof CONTACT_SUBJECTS)[number];

interface FormState {
  fullName: string;
  email: string;
  organisation: string;
  subject: Subject | "";
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMPTY_FORM: FormState = {
  fullName: "",
  email: "",
  organisation: "",
  subject: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[A-Za-z\s]+$/;

// Field validation — README table: Name (min 2, alpha+spaces), Email
// (RFC 5322-ish), Organisation (none), Subject (must be in the list),
// Message (min 20 chars).
function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (form.fullName.trim().length < 2 || !NAME_RE.test(form.fullName.trim())) {
    errors.fullName = "Please enter your full name";
  }
  if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = "Please enter a valid email address";
  }
  if (!CONTACT_SUBJECTS.includes(form.subject as Subject)) {
    errors.subject = "Please select a subject";
  }
  if (form.message.trim().length < 20) {
    errors.message = "Please provide more detail (min 20 characters)";
  }

  return errors;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const { executeRecaptcha } = useGoogleReCaptcha();

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");

    try {
      
      // POST /api/contact → Resend → MCA email (see issue #9 for the
      // API route side of this — that route sends the email; this
      // component only needs it to return ok/not-ok)
      if (!executeRecaptcha) {
        console.log("reCAPTCHA is not ready.");
        setStatus("error");
        return;
      }
      const recaptchaToken = await executeRecaptcha("contact_form");
      
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          recaptchaToken,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      // ERR-001 fallback
      setStatus("error");
    }
  }

  return (
    <div>
      {/* Kicker + heading */}
      <div className="mb-2 flex items-center gap-3">
        <span className="h-0.5 w-8 bg-[#C85A1A]" />
        <span className="text-xs font-semibold uppercase tracking-wide text-[#C85A1A]">
          Get in Touch
        </span>
      </div>
      <h2 className="text-3xl font-bold text-[#2C2C2C]">
        Reach out to the consortium
      </h2>

      {status === "success" ? (
        <div className="mt-8 rounded-lg bg-[#F5F5F5] p-8 text-center">
          <p className="font-semibold text-[#2C2C2C]">
            Thanks — your message has been sent. We&apos;ll be in touch soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[#2C2C2C]">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="e.g. Jane Dlamini"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className="mt-1 w-full rounded-md border border-[#6B7280]/40 px-3 py-2 placeholder:text-[#6B7280]/60 focus:border-[#C85A1A] focus:outline-none focus:ring-1 focus:ring-[#C85A1A]"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-1 text-sm text-red-600">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2C2C2C]">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                placeholder="e.g. jane@wits.ac.za"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="mt-1 w-full rounded-md border border-[#6B7280]/40 px-3 py-2 placeholder:text-[#6B7280]/60 focus:border-[#C85A1A] focus:outline-none focus:ring-1 focus:ring-[#C85A1A]"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="organisation" className="block text-sm font-medium text-[#2C2C2C]">
              Organisation
            </label>
            <input
              id="organisation"
              type="text"
              placeholder="e.g. Wits University"
              value={form.organisation}
              onChange={(e) => update("organisation", e.target.value)}
              className="mt-1 w-full rounded-md border border-[#6B7280]/40 px-3 py-2 placeholder:text-[#6B7280]/60 focus:border-[#C85A1A] focus:outline-none focus:ring-1 focus:ring-[#C85A1A]"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-[#2C2C2C]">
              Subject *
            </label>
            <select
              id="subject"
              value={form.subject}
              onChange={(e) => update("subject", e.target.value as FormState["subject"])}
              className="mt-1 w-full rounded-md border border-[#6B7280]/40 px-3 py-2 text-[#2C2C2C] focus:border-[#C85A1A] focus:outline-none focus:ring-1 focus:ring-[#C85A1A]"
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            >
              <option value="" disabled>
                Select a subject
              </option>
              {CONTACT_SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            {errors.subject && (
              <p id="subject-error" className="mt-1 text-sm text-red-600">
                {errors.subject}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#2C2C2C]">
              Message *
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="[Minimum 20 characters]"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className="mt-1 w-full rounded-md border border-[#6B7280]/40 px-3 py-2 placeholder:text-[#6B7280]/60 focus:border-[#C85A1A] focus:outline-none focus:ring-1 focus:ring-[#C85A1A]"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-600">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-md bg-[#C85A1A] px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Send Message"}
          </button>

          {status === "error" && (
            <p className="text-sm text-red-600">
              Message failed to send. Please email us directly at{" "}
              <a href="mailto:info@medconsortium.org" className="underline">
                [Placeholder: info@medconsortium.org]
              </a>
              .
            </p>
          )}

          {/* POPIA notice — required by SA law */}
          <div className="flex items-start gap-2 rounded-md border border-[#6B7280]/30 bg-[#F5F5F5] p-3 text-xs text-[#6B7280]">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mt-0.5 h-4 w-4 flex-shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9zm1-4a1.25 1.25 0 100 2.5A1.25 1.25 0 0010 5z"
                clipRule="evenodd"
              />
            </svg>
            <p>
              <strong>POPIA Notice:</strong> information submitted here is
              used solely to respond to your enquiry, per the Protection of
              Personal Information Act.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
