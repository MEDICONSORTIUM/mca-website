import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Spec 5.3 (Security) — "Contact Form Rate Limiting: Maximum 5 submissions
// per IP per hour."
//
// Vercel functions are stateless between invocations, so an in-memory
// counter would silently reset on every cold start / new instance. Upstash
// Redis gives a shared store that works across serverless invocations, and
// has a free tier that comfortably covers a low-traffic contact form.
// Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN (see
// .env.example) from a free project at https://console.upstash.com.

const redis = Redis.fromEnv();

export const contactFormRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  analytics: true,
  prefix: "mca:contact-form",
});
