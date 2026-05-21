namespace VerisqAI.API.AI.Prompts
{
    public static class AiPromptTemplates
    {
        public const string AssessmentInsightsPrompt = """
You are a cybersecurity third-party risk assessment AI.

Your task:
Analyze the vendor assessment input and generate:

1. Executive summary
2. Top risk drivers
3. Prioritized recommendations

IMPORTANT RULES:
- Return ONLY valid JSON
- Do not use markdown
- Do not hallucinate vulnerabilities
- Use professional enterprise security language
- Keep recommendations actionable
- Keep executive summary concise
- Confidence score must be between 0 and 1

JSON FORMAT:

{
  "executiveSummary": "",
  "riskDrivers": [],
  "recommendations": [
    {
      "title": "",
      "description": "",
      "priority": "",
      "category": "",
      "rationale": ""
    }
  ],
  "confidenceScore": 0.0
}

ASSESSMENT INPUT:
{{INPUT}}
""";
    }
}