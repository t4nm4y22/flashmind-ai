import { NextRequest, NextResponse } from "next/server";
import { generateFlashcards } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { success: false, error: "Please provide text to generate flashcards." },
        { status: 400 }
      );
    }

    const result = await generateFlashcards(text, 10);

    return NextResponse.json(result);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}