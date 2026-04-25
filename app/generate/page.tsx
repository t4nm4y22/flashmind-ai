"use client";

import { saveDeck , getDecks } from '@/lib/supabase';
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FlashCard from "@/components/FlashCard";

interface Flashcard {
  front: string;
  back: string;
}

export default function GeneratePage() {
  const [inputText, setInputText] = useState("");
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleSaveDeck = async () => {
  if (!cards || cards.length === 0) {
    alert('No flashcards to save!');
    return;
    }

  // Check freemium limit
  const existingDecks = await getDecks();
  if (existingDecks && existingDecks.length >= 3) {
    alert('🔒 You\'ve reached the free limit of 3 decks!\n\nSupport us on Ko-fi to unlock unlimited decks!');
    return;
    }

  const deckTitle = prompt('Enter a title for this deck:');
  if (!deckTitle) return;

  const deckDescription = prompt('Enter a description (optional):') || '';

  try {
    await saveDeck(deckTitle, deckDescription, cards);
    alert('Deck saved successfully! ✅');
    } catch (error) {
    console.error('Error saving deck:', error);
    alert('Failed to save deck. Please try again.');
    }
  };

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError("Please paste some text first!");
      return;
    }

    setIsGenerating(true);
    setError("");
    setCards([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (data.success && data.cards) {
        setCards(data.cards);
        setCurrentCardIndex(0);
        setInputText(""); // Clear input after success
      } else {
        setError(data.error || "Failed to generate flashcards. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-24 pb-16">
        <div className="section-container max-w-4xl">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-cream mb-4">
              Generate Your <span className="text-gradient">Flashcards</span>
            </h1>
            <p className="text-cream-muted text-lg">
              Paste any study material below and let AI create smart flashcards for you.
            </p>
          </div>

          {/* Input Section - Only show if no cards generated */}
          {cards.length === 0 && (
            <div className="glass-card p-8 mb-8">
              <label htmlFor="study-text" className="block text-cream text-sm font-medium mb-3">
                Paste your study material
              </label>
              <textarea
                id="study-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste lecture notes, textbook excerpts, Wikipedia articles, or any study material here...&#10;&#10;Example: The OSI model is a conceptual framework used to standardize the functions of a telecommunication or computing system..."
                className="w-full h-64 bg-midnight-light border border-border rounded-lg px-4 py-3 text-cream placeholder:text-cream-subtle focus:outline-none focus:border-amber resize-none"
                disabled={isGenerating}
              />
              
              <div className="flex items-center justify-between mt-4">
                <p className="text-cream-subtle text-sm">
                  {inputText.length} characters {inputText.length >= 100 ? "✓" : "(minimum 100)"}
                </p>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || inputText.length < 100}
                  className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-midnight border-t-transparent rounded-full animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    "Generate Flashcards ✨"
                  )}
                </button>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-error/10 border border-error/30 rounded-lg">
                  <p className="text-error text-sm">{error}</p>
                </div>
              )}

              <div className="mt-6 p-4 bg-amber-muted border border-amber/20 rounded-lg">
                <p className="text-amber text-sm">
                  <strong>💡 Pro tip:</strong> Paste at least a full paragraph for best results. The AI works better with more context!
                </p>
              </div>
            </div>
          )}

          {/* Flashcard Display Section */}
          {cards.length > 0 && (
            <div>
              {/* Success message */}
              <div className="mb-8 p-4 bg-success/10 border border-success/30 rounded-lg">
                <p className="text-success text-sm text-center">
                  ✓ Generated {cards.length} flashcards! Click the card to flip it.
                </p>
              </div>
              
              {/* Save Deck Button */}
              <button
                onClick={handleSaveDeck}
                className="btn-primary mb-6 w-full sm:w-auto"
              >
                💾 Save This Deck
              </button>

              {/* Card display */}
              <div className="mb-8">
                <FlashCard
                  front={cards[currentCardIndex].front}
                  back={cards[currentCardIndex].back}
                  cardNumber={currentCardIndex + 1}
                  totalCards={cards.length}
                />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentCardIndex === 0}
                  className="btn-ghost px-6 py-3 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>

                <p className="text-cream-muted text-sm">
                  Card {currentCardIndex + 1} of {cards.length}
                </p>

                <button
                  onClick={handleNext}
                  disabled={currentCardIndex === cards.length - 1}
                  className="btn-ghost px-6 py-3 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCardIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentCardIndex
                        ? "bg-amber w-8"
                        : "bg-border hover:bg-cream-subtle"
                    }`}
                    aria-label={`Go to card ${index + 1}`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setCards([]);
                    setCurrentCardIndex(0);
                    setError("");
                  }}
                  className="btn-ghost px-8 py-3"
                >
                  Generate New Set
                </button>
                <button
                  onClick={() => alert("Save feature coming in Phase 4!")}
                  className="btn-primary px-8 py-3"
                >
                  Save Deck 💾
                </button>
              </div>
            </div>
          )}

          {/* Back to home link */}
          <div className="text-center mt-12">
            <Link href="/" className="text-cream-muted hover:text-amber transition-colors text-sm">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}