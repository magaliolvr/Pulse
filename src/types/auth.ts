import type { AuthError } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

/**
 * Profile type based on Supabase database schema
 */
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

/**
 * Error type for database operations (can be PostgrestError or null)
 */
export type DatabaseError = { 
  message: string;
  details?: string;
  hint?: string;
  code?: string;
} | null;

