"use client";

import { useState } from "react";

interface FlashCardProps {
  front: string;
  back: string;
  cardNumber: number;
  totalCards: number;
}

export default function FlashCard({ front, back, cardNumber, totalCards }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="perspective-container">
      <div
        className={`flashcard ${isFlipped ? "flipped" : ""}`}
        onClick={handleFlip}
      >
        {/* Front of card */}
        <div className="flashcard-face flashcard-front">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs text-cream-subtle font-medium uppercase tracking-widest">
              Flashcard {cardNumber} of {totalCards}
            </span>
            <span className="text-xs text-amber font-medium">Question</span>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <p className="font-serif text-2xl md:text-3xl text-cream leading-snug text-center px-4">
              {front}
            </p>
          </div>

          <p className="text-cream-subtle text-sm text-center mt-6">
            Click to reveal answer →
          </p>
        </div>

        {/* Back of card */}
        <div className="flashcard-face flashcard-back">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs text-cream-subtle font-medium uppercase tracking-widest">
              Flashcard {cardNumber} of {totalCards}
            </span>
            <span className="text-xs text-success font-medium">Answer</span>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <p className="text-cream text-base md:text-lg leading-relaxed px-4">
              {back}
            </p>
          </div>

          <p className="text-cream-subtle text-sm text-center mt-6">
            Click to flip back ↩
          </p>
        </div>
      </div>

      {/* Custom CSS for 3D flip animation */}
      <style jsx>{`
        .perspective-container {
          perspective: 1000px;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .flashcard {
          position: relative;
          width: 100%;
          height: 400px;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          cursor: pointer;
        }

        .flashcard.flipped {
          transform: rotateY(180deg);
        }

        .flashcard-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          background: var(--color-midnight-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-card);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .flashcard-face:hover {
          border-color: var(--color-border-hover);
          box-shadow: var(--shadow-hover);
        }

        .flashcard-front {
          transform: rotateY(0deg);
        }

        .flashcard-back {
          transform: rotateY(180deg);
          background: linear-gradient(145deg, #1A2744, #1F2E50);
          border-color: var(--color-amber);
          border-width: 1px;
        }

        @media (max-width: 640px) {
          .flashcard {
            height: 350px;
          }
          .flashcard-face {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}