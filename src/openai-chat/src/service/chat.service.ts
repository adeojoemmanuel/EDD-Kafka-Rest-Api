import OpenAI from "openai";
const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  throw new Error("OpenAI API key is required");
}

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

export const generateText = async(prompt: string) => {
  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7,
    });
    if (response.choices && response.choices.length > 0) {
      return response.choices[0].text;
    }
  } catch (error) {
    console.error("Error generating text:", error);
  }
  return null;
}

