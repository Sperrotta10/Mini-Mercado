import { enviroment } from "./enviroment.js"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = enviroment.SUPABASE_URL
const supabaseKey = enviroment.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)