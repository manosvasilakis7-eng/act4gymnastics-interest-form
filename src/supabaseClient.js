import { createClient } from "@supabase/supabase-js";

// Οι τιμές διαβάζονται αποκλειστικά από environment variables.
// Ποτέ μην γράψετε το URL ή το κλειδί απευθείας εδώ μέσα.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Λείπουν τα VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Ελέγξτε το αρχείο .env (τοπικά) ή τις μεταβλητές περιβάλλοντος στο Vercel."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
