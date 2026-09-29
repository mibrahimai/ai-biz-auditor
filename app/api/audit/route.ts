import { NextRequest, NextResponse } from "next/server";
import { geminiModel, AUDIT_PROMPT } from "@/lib/gemini";

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

    const prompt = AUDIT_PROMPT(body);
    const result = await geminiModel.generateContent(prompt);
    const text = result.response.text();
    const report = JSON.parse(text);

    return NextResponse.json({ success: true, report });
  } catch (error) {
    console.error("Audit error:", error);
    return NextResponse.json(
      { error: "Failed to generate audit. Check your API key." },
      { status: 500 }
    );
  }
}
