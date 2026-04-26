import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return supabaseInstance;
}

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

export async function saveDeck(
  title: string,
  description: string,
  flashcards: { front: string; back: string }[]
) {
  const { data: deck, error: deckError } = await getSupabase()
    .from('decks')
    .insert({ title, description, card_count: flashcards.length })
    .select()
    .single();

  if (deckError) throw deckError;

  const flashcardsToInsert = flashcards.map((card, index) => ({
    deck_id: deck.id,
    front: card.front,
    back: card.back,
    order: index,
  }));

  const { error: cardsError } = await getSupabase()
    .from('flashcards')
    .insert(flashcardsToInsert);

  if (cardsError) throw cardsError;
  return deck;
}

export async function getDecks() {
  const { data, error } = await getSupabase()
    .from('decks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Deck[];
}

export async function getDeck(deckId: string) {
  const { data: deck, error: deckError } = await getSupabase()
    .from('decks')
    .select('*')
    .eq('id', deckId)
    .single();

  if (deckError) throw deckError;

  const { data: flashcards, error: cardsError } = await getSupabase()
    .from('flashcards')
    .select('*')
    .eq('deck_id', deckId)
    .order('order', { ascending: true });

  if (cardsError) throw cardsError;
  return { deck: deck as Deck, flashcards: flashcards as Flashcard[] };
}