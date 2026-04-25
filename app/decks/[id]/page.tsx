'use client';

import { useEffect, useState } from 'react';
import { getDeck } from '@/lib/db';
import { useParams } from 'next/navigation';
import FlashCard from '@/components/FlashCard';
import Link from 'next/link';

export default function DeckPage() {
  const { id } = useParams();
  const [deck, setDeck] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getDeck(id as string);
      setDeck(data);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return (
    <div className="text-center mt-20 text-cream opacity-70">Loading deck...</div>
  );

  if (!deck) return (
    <div className="text-center mt-20 text-cream opacity-70">Deck not found.</div>
  );

  const cards = deck.flashcards || [];

  return (
    <div className="max-w-xl mx-auto mt-10 px-4 pb-20">
      <Link href="/decks" className="text-sm text-cream opacity-60 hover:opacity-100 mb-6 inline-block">
        ← Back to My Decks
      </Link>

      <h1 className="text-2xl font-bold text-cream mb-1">{deck.title}</h1>
      <p className="text-cream opacity-60 text-sm mb-8">{deck.description}</p>

      {cards.length > 0 && (
        <>
          <FlashCard
            front={cards[currentIndex].front}
            back={cards[currentIndex].back}
            cardNumber={currentIndex + 1}
            totalCards={cards.length}
          />

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="btn-ghost px-6 py-3 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <span className="text-cream opacity-50 text-sm">
              {currentIndex + 1} / {cards.length}
            </span>

            <button
              onClick={() => setCurrentIndex((i) => Math.min(cards.length - 1, i + 1))}
              disabled={currentIndex === cards.length - 1}
              className="btn-ghost px-6 py-3 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}