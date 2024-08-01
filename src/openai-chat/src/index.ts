import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { generateTextCall } from "./controller/chat.controller";

const app = express();


app.use(express.json());
app.post("/api/generate-text", generateTextCall);


app.get("/", (req: Request, res: Response) => {
  res.send("OpenAI Text Generation API");
});

const PORT = process.env.PORT || 3210;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
