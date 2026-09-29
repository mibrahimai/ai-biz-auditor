"use client";

import { useState, useEffect } from "react";

interface FormData {
  businessName: string;
  businessType: string;
  teamSize: string;
  dailyWorkflows: string;
  timeWasters: string;
  currentTools: string;
  customerComms: string;
  painPoint: string;
}

interface AuditFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const STEPS = [
  {
    title: "Business Basics",
    subtitle: "Tell us about your business",
    fields: ["businessName", "businessType", "teamSize"],
  },
  {
    title: "Daily Operations",
    subtitle: "What does your team actually do?",
    fields: ["dailyWorkflows", "timeWasters"],
  },
  {
    title: "Tools & Pain Points",
    subtitle: "What you use and where it hurts",
    fields: ["currentTools", "customerComms", "painPoint"],
  },
];

const FIELD_CONFIG: Record<
  string,
  { label: string; hint?: string; placeholder: string; type: "input" | "textarea" | "select"; options?: string[] }
> = {
  businessName: {
    label: "Business Name",
    placeholder: "e.g. Smith & Associates",
    type: "input",
  },
  businessType: {
    label: "Industry / Business Type",
    hint: "Be specific — this helps us tailor the recommendations",
    placeholder: "e.g. Estate planning law firm, E-commerce store, Marketing agency",
    type: "input",
  },
  teamSize: {
    label: "Team Size",
    placeholder: "Select team size",
    type: "select",
    options: ["Just me (1)", "2–5 people", "6–15 people", "16–50 people", "50+ people"],
  },
  dailyWorkflows: {
    label: "Describe your main daily workflows",
    hint: "What does your team do every day, step by step?",
    placeholder: "e.g. We receive client inquiries by email, manually enter them into a spreadsheet, then call them to schedule a consultation. After the call we create a contract in Word and email it...",
    type: "textarea",
  },
  timeWasters: {
    label: "Biggest time wasters",
    hint: "Where do you or your team lose the most time each week?",
    placeholder: "e.g. Copy-pasting data between systems, sending follow-up emails manually, building monthly reports from scratch in Excel...",
    type: "textarea",
  },
  currentTools: {
    label: "Tools & Software You Currently Use",
    hint: "List everything: email, CRM, spreadsheets, communication tools",
    placeholder: "e.g. Gmail, Google Sheets, Slack, QuickBooks, Calendly, Notion, HubSpot...",
    type: "textarea",
  },
  customerComms: {
    label: "How do you communicate with customers?",
    placeholder: "e.g. Email, WhatsApp, phone calls, Zoom meetings, in-person...",
    type: "input",
  },
  painPoint: {
    label: "Your #1 operational pain point right now",
    hint: "If you could fix ONE thing immediately, what would it be?",
    placeholder: "e.g. I spend 3 hours every Monday morning manually sending invoice reminders. It's embarrassing and I always forget someone...",
    type: "textarea",
  },
};

export default function AuditForm({ onSubmit, isLoading }: AuditFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    businessType: "",
    teamSize: "",
    dailyWorkflows: "",
    timeWasters: "",
    currentTools: "",
    customerComms: "",
    painPoint: "",
  });

  const currentFields = STEPS[currentStep].fields as (keyof FormData)[];

  const isStepValid = () =>
    currentFields.every((f) => formData[f].trim().length > 0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep((s) => s + 1);
    else onSubmit(formData);
  };

  return (
    <div className="form-card">
      {/* Step Progress */}
      <div className="step-progress">
        {STEPS.map((_, i) => (
          <div key={i} style={{ display: "contents" }}>
            <div
              className={`step-dot ${i < currentStep ? "done" : i === currentStep ? "active" : ""}`}
            >
              {i < currentStep ? "✓" : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`step-line ${i < currentStep ? "done" : ""}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Header */}
      <div className="step-header">
        <div className="step-label">Step {currentStep + 1} of {STEPS.length}</div>
        <div className="step-title">{STEPS[currentStep].title}</div>
        <div className="step-subtitle">{STEPS[currentStep].subtitle}</div>
      </div>

      {/* Fields */}
      <div className="field-group">
        {currentFields.map((fieldKey) => {
          const config = FIELD_CONFIG[fieldKey];
          return (
            <div className="field" key={fieldKey}>
              <label htmlFor={fieldKey}>{config.label}</label>
              {config.hint && <span className="hint">{config.hint}</span>}
              {config.type === "textarea" ? (
                <textarea
                  id={fieldKey}
                  placeholder={config.placeholder}
                  value={formData[fieldKey]}
                  onChange={(e) =>
                    setFormData((d) => ({ ...d, [fieldKey]: e.target.value }))
                  }
                />
              ) : config.type === "select" ? (
                <select
                  id={fieldKey}
                  value={formData[fieldKey]}
                  onChange={(e) =>
                    setFormData((d) => ({ ...d, [fieldKey]: e.target.value }))
                  }
                >
                  <option value="">Select team size...</option>
                  {config.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={fieldKey}
                  type="text"
                  placeholder={config.placeholder}
                  value={formData[fieldKey]}
                  onChange={(e) =>
                    setFormData((d) => ({ ...d, [fieldKey]: e.target.value }))
                  }
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="btn-row">
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          style={{ visibility: currentStep === 0 ? "hidden" : "visible" }}
        >
          ← Back
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={!isStepValid() || isLoading}
        >
          {currentStep < STEPS.length - 1
            ? "Continue →"
            : isLoading
            ? "Generating..."
            : "Generate Audit Report ✨"}
        </button>
      </div>
    </div>
  );
}
