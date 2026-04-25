import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Deck {
  id: string;
  created_at: string;
  title: string;
  description: string | null;
  user_id: string | null;
  card_count: number | null;
}

export interface Flashcard {
  id: string;
  created_at: string;
  deck_id: string;
  front: string;
  back: string;
  order: number | null;
}

// Save a new deck with flashcards
export async function saveDeck(
  title: string,
  description: string,
  flashcards: { front: string; back: string }[]
) {
  // 1. Insert deck
  const { data: deck, error: deckError } = await supabase
    .from('decks')
    .insert({
      title,
      description,
      card_count: flashcards.length,
    })
    .select()
    .single();

  if (deckError) throw deckError;

  // 2. Insert flashcards
  const flashcardsToInsert = flashcards.map((card, index) => ({
    deck_id: deck.id,
    front: card.front,
    back: card.back,
    order: index,
  }));

  const { error: cardsError } = await supabase
    .from('flashcards')
    .insert(flashcardsToInsert);

  if (cardsError) throw cardsError;

  return deck;
}

// Get all decks
export async function getDecks() {
  const { data, error } = await supabase
    .from('decks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Deck[];
}

// Get a single deck with its flashcards
export async function getDeck(deckId: string) {
  const { data: deck, error: deckError } = await supabase
    .from('decks')
    .select('*')
    .eq('id', deckId)
    .single();

  if (deckError) throw deckError;

  const { data: flashcards, error: cardsError } = await supabase
    .from('flashcards')
    .select('*')
    .eq('deck_id', deckId)
    .order('order', { ascending: true });

  if (cardsError) throw cardsError;

  return { deck: deck as Deck, flashcards: flashcards as Flashcard[] };
}