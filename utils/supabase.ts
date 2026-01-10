import { createClient } from '@supabase/supabase-js';

// Prefer server-side env vars when available, fall back to NEXT_PUBLIC for local/dev
const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
	process.env.SUPABASE_SERVICE_ROLE_KEY ??
	process.env.SUPABASE_ANON_KEY ??
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
	throw new Error(
		'Missing Supabase environment variables. Set SUPABASE_URL and SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY).'
	);
}

export const supabase = createClient(supabaseUrl, supabaseKey);