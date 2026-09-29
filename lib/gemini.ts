import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.7,
  },
});

export const AUDIT_PROMPT = (data: Record<string, string>) => `
You are an expert business automation consultant. A client has filled out an intake form. Analyze their workflows and produce a detailed automation audit report.

CLIENT INTAKE DATA:
- Business Name: ${data.businessName}
- Industry/Type: ${data.businessType}
- Team Size: ${data.teamSize}
- Daily Workflows: ${data.dailyWorkflows}
- Biggest Time Wasters: ${data.timeWasters}
- Tools Currently Used: ${data.currentTools}
- Customer Communication: ${data.customerComms}
- Biggest Pain Point: ${data.painPoint}

Return ONLY a valid JSON object in this exact structure:
{
  "businessName": "string",
  "executiveSummary": "2-3 sentence overview of their automation readiness",
  "automationScore": number between 1-100,
  "automationScoreLabel": "Low/Medium/High/Very High",
  "opportunities": [
    {
      "priority": 1,
      "title": "Short opportunity title",
      "problem": "What is currently happening manually",
      "solution": "Exactly what gets automated",
      "tools": ["Tool1", "Tool2"],
      "timeSavedPerWeek": "X hours/week",
      "complexity": "Low/Medium/High",
      "estimatedBuildTime": "X days",
      "roi": "Plain english ROI statement"
    }
  ],
  "quickWins": ["string array of 3 things they can do TODAY for free, no dev needed"],
  "recommendedStack": {
    "automation": "e.g. n8n or Zapier",
    "ai": "e.g. Gemini API or OpenAI",
    "database": "e.g. Supabase or Airtable",
    "reason": "Why this stack fits them"
  },
  "nextSteps": ["Step 1", "Step 2", "Step 3"]
}

Produce exactly 3 automation opportunities ordered by priority (1=highest). Be specific, practical, and realistic. Use tools appropriate for their tech level based on team size and current tools.
`;
