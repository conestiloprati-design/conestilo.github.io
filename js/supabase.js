import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

export const supabase = createClient(
  'https://fypjfxwcruzmbrvoijwg.supabase.co',
  'sb_publishable_n_uQGLyDg5sgMgBRBvYdng_IqpQeX1L' // ⚠️ Usa la anon key desde Settings → API
)
