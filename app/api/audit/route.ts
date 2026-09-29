import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AUDIT_PROMPT } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const requiredFields = [
      "businessName",
      "businessType",
      "teamSize",
      "dailyWorkflows",
      "timeWasters",
      "currentTools",
      "customerComms",
      "painPoint",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Try models in order of speed and availability
    const CANDIDATE_MODELS = [
      "gemini-3.5-flash-lite",
      "gemini-3.5-flash",
      "gemini-3.8-flash",
    ];

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const prompt = AUDIT_PROMPT(body);

    let lastError: any = null;
    let report: any = null;

    for (const modelName of CANDIDATE_MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        });

        const result = await model.generateContent(prompt);
        let text = result.response.text().trim();
        
        // Strip markdown code fences if present
        if (text.startsWith("```json")) {
          text = text.replace(/^```json\s*/, "").replace(/\s*```$/, "");
        } else if (text.startsWith("```")) {
          text = text.replace(/^```\s*/, "").replace(/\s*```$/, "");
        }

        report = JSON.parse(text);
        break; // Successfully generated and parsed
      } catch (err: any) {
        console.warn(`Model ${modelName} failed, trying fallback:`, err?.message || err);
        lastError = err;
      }
    }

    if (!report) {
      throw lastError || new Error("All candidate models failed to generate report.");
    }

    return NextResponse.json({ success: true, report });
  } catch (error: any) {
    console.error("Audit error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate audit. Check your API key." },
      { status: 500 }
    );
  }
}
