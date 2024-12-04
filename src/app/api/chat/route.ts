import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages, model, temperature, frequencyPenalty, presencePenalty } =
    await req.json();

  const result = streamText({
    model: google("gemini-1.5-flash"),
    messages,
    temperature: temperature || 0.7,
    frequencyPenalty: frequencyPenalty || 0,
    presencePenalty: presencePenalty || 0,
  });

  return result.toDataStreamResponse();
}
