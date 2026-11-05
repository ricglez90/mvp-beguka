import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_STORYTELLER_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_STORYTELLER_SUPABASE_ANON_KEY

// Exportamos esta instancia aislada
export const supabaseStoryteller = createClient(supabaseUrl, supabaseAnonKey)