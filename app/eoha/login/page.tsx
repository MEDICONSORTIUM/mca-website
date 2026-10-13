"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Sign in failed. Try again.");
        setLoading(false);
        return;
      }
      sessionStorage.setItem("mca_tab_auth", "1"); // cleared automatically when the tab closes
      const next = params.get("next");
      // Only allow redirects inside the EOHA section
      const safeNext = next && next.startsWith("/eoha") ? next : "/eoha";
      router.replace(safeNext);
      router.refresh();
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <Link href="/" className={styles.back}>Back to Medical Consortium of Africa</Link>
        <h1 className={styles.title}>Sign in to EOHA</h1>
        <p className={styles.subtitle}>
          Earth Observational Health Analytics is for authorised administrators.
        </p>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <label className={styles.label} htmlFor="username">Username</label>
          <input
            id="username"
            className={styles.input}
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />

          <label className={styles.label} htmlFor="password">Password</label>
          <div className={styles.passwordRow}>
            <input
              id="password"
              className={styles.input}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className={styles.toggle}
              onClick={() => setShowPassword((s) => !s)}
              aria-pressed={showPassword}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <p className={styles.error} role="alert" aria-live="polite">{error}</p>

          <button type="submit" className={styles.submit} disabled={loading || !username || !password}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
