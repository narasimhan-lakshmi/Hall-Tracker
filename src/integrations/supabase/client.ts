
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cjpyfzrlsnvovhazgvyg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqcHlmenJsc252b3ZoYXpndnlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzODkwODUsImV4cCI6MjA1NTk2NTA4NX0.EX1-oRwj7wXXIeOhPsX7M9w4URC0FP5OquEEnSC1zl8";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
