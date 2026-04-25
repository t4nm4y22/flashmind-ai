'use client';

import { useEffect, useState } from 'react';
import { getDecks } from '@/lib/supabase';
import Link from 'next/link';

type Deck = {
  id: string;
  title: string;
  description: string | null;
  card_count: number | null;
  created_at: string;
};

export default function MyDecksPage() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDecks() {
      const data = await getDecks();
      setDecks(data || []);
      setLoading(false);
    }
    loadDecks();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-cream opacity-70">
        Loading your decks...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 pb-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-cream">📚 My Decks</h1>
        <Link
          href="/generate"
          className="btn-primary px-4 py-2 text-sm"
        >
          + New Deck
        </Link>
      </div>

      {decks.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-cream opacity-70 mb-4">No saved decks yet.</p>
          <Link href="/generate" className="btn-primary px-6 py-3">
            Generate Your First Deck
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {decks.map((deck) => (
            <Link key={deck.id} href={`/decks/${deck.id}`}>
              <div className="border border-white/10 rounded-xl p-5 hover:bg-white/5 cursor-pointer transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-cream">
                      {deck.title}
                    </h2>
                    <p className="text-sm text-cream opacity-60 mt-1">
                      {deck.description || 'No description'}
                    </p>
                  </div>
                  <span className="text-xs bg-gold/20 text-gold px-3 py-1 rounded-full whitespace-nowrap ml-4">
                    {deck.card_count} cards
                  </span>
                </div>
                <p className="text-xs text-cream opacity-40 mt-3">
                  Saved on {new Date(deck.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}