"use client";

import { useState } from "react";

const FIELD_CLASS =
  "font-body mt-1 block w-full border border-[var(--color-border-primary)] px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-border-focus)] focus:outline-none focus:ring-1 focus:ring-[var(--color-border-focus)]";
const LABEL_CLASS =
  "font-body block text-sm font-medium text-[var(--color-text-primary)]";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");

    // Post to the static form file so Netlify's form handler receives it
    // (public/netlify-form-contact.html registers the same fields).
    fetch("/netlify-form-contact.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(e.currentTarget)).toString(),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Form submission failed");
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      })
      .catch(() => setStatus("error"));
  };

  if (status === "success") {
    return (
      <div className="font-body border border-[var(--color-status-success)] p-6 text-[var(--color-status-success)]">
        Thank you. Your message has been sent and we will be in touch
        shortly.
      </div>
    );
  }

  return (
    <form
      name="contact"
      onSubmit={handleSubmit}
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="space-y-4"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Leave this field empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div>
        <label htmlFor="name" className={LABEL_CLASS}>
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className={FIELD_CLASS}
        />
      </div>

      <div>
        <label htmlFor="email" className={LABEL_CLASS}>
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className={FIELD_CLASS}
        />
      </div>

      <div>
        <label htmlFor="phone" className={LABEL_CLASS}>
          Phone number (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          className={FIELD_CLASS}
        />
      </div>

      <div>
        <label htmlFor="message" className={LABEL_CLASS}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          className={FIELD_CLASS}
        />
      </div>

      {status === "error" && (
        <p className="font-body text-sm text-[var(--color-status-error)]">
          Something went wrong sending your message. Please try again or
          call the school office directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="font-body inline-flex items-center rounded-full bg-[var(--brand-navy-900)] px-6 py-2.5 text-sm font-semibold text-[var(--brand-cream-50)] transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
