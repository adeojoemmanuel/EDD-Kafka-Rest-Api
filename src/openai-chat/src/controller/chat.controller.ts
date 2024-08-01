
import { Request, Response } from "express";
import { generateText } from "./../service/chat.service";


export const generateTextCall = async (req: Request, res: Response) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const text = await generateText(prompt);

    if (text) {
      return res.status(200).json({ text });
    } else {
      return res.status(500).json({ error: "Failed to generate text" });
    }
  } catch (error) {
    console.error("Error in generateTextCall:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
