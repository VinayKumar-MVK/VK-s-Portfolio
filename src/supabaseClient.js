import { createClient } from "@supabase/supabase-js";

// ──────────────────────────────────────────────
// 🔧 PASTE YOUR SUPABASE URL HERE
// ──────────────────────────────────────────────
const SUPABASE_URL = "https://iwyjmqwrsxbktcnseyks.supabase.co/rest/v1/";

// ──────────────────────────────────────────────
// 🔑 PASTE YOUR SUPABASE PUBLIC KEY HERE
// ──────────────────────────────────────────────
const SUPABASE_PUBLIC_KEY = "sb_publishable_JaXKVWx-8kK-PgonmNV-Zw_F_6WupoX";

// ──────────────────────────────────────────────
// Supabase client — import this wherever needed:
// import { supabase } from "../supabaseClient";
// ──────────────────────────────────────────────
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
