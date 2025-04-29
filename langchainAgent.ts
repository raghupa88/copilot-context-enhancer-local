export async function enrichPrompt(userInput: string): Promise<string> {
  // Simulated context enhancement logic without LLMs
  const internalGuidelines = [
    "Ensure all code changes include unit tests.",
    "Follow naming conventions: camelCase for variables, PascalCase for classes.",
    "Avoid hardcoding values; use environment configurations."
  ];

  const context = internalGuidelines.map(g => `- ${g}`).join("\n");

  return `### Contextual Guidelines:\n${context}\n\n### Your Prompt:\n${userInput}`;
}
