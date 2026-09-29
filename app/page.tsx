"use client";

import { useState } from "react";
import AuditForm from "@/components/AuditForm";
import AuditReport from "@/components/AuditReport";

type AppState = "form" | "loading" | "report" | "error";

const LOADING_MESSAGES = [
  "Analyzing your workflows...",
  "Identifying automation opportunities...",
  "Calculating time savings...",
  "Building your tech stack recommendations...",
  "Writing your audit report...",
];

export default function HomePage() {
  const [state, setState] = useState<AppState>("form");
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState("");
  const [loadingStep, setLoadingStep] = useState(0);

  const handleSubmit = async (formData: Record<string, string>) => {
    setState("loading");
    setError("");

    // Cycle loading messages
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % LOADING_MESSAGES.length;
      setLoadingStep(step);
    }, 1800);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      clearInterval(interval);

      if (!res.ok || !data.success) {
        setError(data.error || "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      setReport(data.report);
      setState("report");
    } catch (err) {
      clearInterval(interval);
      setError("Network error. Make sure your API key is set in .env.local");
      setState("error");
    }
  };

  const handleReset = () => {
    setState("form");
    setReport(null);
    setError("");
    setLoadingStep(0);
  };

  return (
    <main className="page-wrapper">
      {/* Header */}
      {state !== "report" && (
        <header className="header">
          <div className="header-badge">
            <span className="dot" />
            Powered by Gemini 1.5 Flash
          </div>
          <h1>AI Business Process Auditor</h1>
          <p>
            Answer 8 questions about your business. Get a free, AI-generated report
            identifying your top automation opportunities — with tools, time savings,
            and a recommended tech stack.
          </p>
        </header>
      )}

      {/* States */}
      {state === "form" && (
        <>
          {error && <div className="error-card" style={{ maxWidth: 780, width: "100%", marginBottom: 16 }}>❌ {error}</div>}
          <AuditForm onSubmit={handleSubmit} isLoading={false} />
        </>
      )}

      {state === "loading" && (
        <div className="form-card" style={{ maxWidth: 500, width: "100%", margin: "0 auto" }}>
          <div className="loading-screen">
            <div className="loading-spinner" />
            <div className="loading-title">Generating your audit...</div>
            <ul className="loading-steps">
              {LOADING_MESSAGES.map((msg, i) => (
                <li key={i} className={i === loadingStep ? "active-step" : ""}>
                  {i < loadingStep ? "✓ " : i === loadingStep ? "→ " : "  "}{msg}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {state === "error" && (
        <>
          <div className="error-card" style={{ maxWidth: 780, width: "100%" }}>
            ❌ {error}
          </div>
          <button className="btn btn-secondary" onClick={handleReset}>
            ← Try Again
          </button>
        </>
      )}

      {state === "report" && report && (
        <>
          <header className="header" style={{ marginBottom: 32 }}>
            <div className="header-badge">
              <span className="dot" />
              Audit Complete
            </div>
            <h1>Your Automation Roadmap</h1>
          </header>
          <AuditReport report={report} onReset={handleReset} />
        </>
      )}

      {/* Footer */}
      <footer className="page-footer">
        Built by{" "}
        <a href="https://github.com/mikkh" target="_blank" rel="noopener noreferrer">
          @mikkh
        </a>{" "}
        · Open source on{" "}
        <a href="https://github.com/mikkh/ai-biz-auditor" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        {" "}· Powered by Gemini 1.5 Flash (free tier)
      </footer>
    </main>
  );
}
