export interface Flashcard {
  front: string;
  back: string;
}

export interface GenerationResult {
  success: boolean;
  cards?: Flashcard[];
  error?: string;
}

export async function generateFlashcards(
  userText: string,
  cardCount: number = 10
): Promise<GenerationResult> {
  const text = userText.trim();
  if (text.length < 100) return { success: false, error: "Paste at least 100 characters." };

  const prompt = `Create ${cardCount} flashcards. Return ONLY JSON: [{"front":"Question?","back":"Answer"}]\n\n${text.substring(0, 10000)}`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Groq error:', JSON.stringify(data));
      return { success: false, error: "Generation failed." };
    }

    const content = data.choices[0].message.content;
    const cleaned = content.replace(/```json|```/g, "").trim();
    const cards: Flashcard[] = JSON.parse(cleaned);
    const valid = cards.filter(c => c.front?.trim() && c.back?.trim());

    return valid.length > 0 ? { success: true, cards: valid } : { success: false, error: "No cards generated." };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: "Generation failed." };
  }
}