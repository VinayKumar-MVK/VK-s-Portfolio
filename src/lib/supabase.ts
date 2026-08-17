import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ── Credentials ────────────────────────────────────────────────────────────────
// Reads from .env (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).
// Falls back to hardcoded values so the app always connects.
const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  "https://iwyjmqwrsxbktcnseyks.supabase.co";

const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eWptcXdyc3hia3RjbnNleWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMjA2NjAsImV4cCI6MjA2OTg5NjY2MH0.J_8Svz9oAJCp4MDp7i_vngCZ0eHGhjCfDtGygU9pde4";

// ── Supabase Client ────────────────────────────────────────────────────────────
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

export const isSupabaseConfigured = true;

// ── Types ──────────────────────────────────────────────────────────────────────
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

