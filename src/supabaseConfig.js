import {createClient} from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_PROJECT_URL
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
