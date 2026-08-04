# ACT4 Gymnastics — Φόρμα Εκδήλωσης Ενδιαφέροντος

Φόρμα σε React (Vite) συνδεδεμένη με Supabase. Κάθε υποβολή αποθηκεύεται
μόνιμα στον πίνακα `interest_submissions`.

## 1. Δημιουργία του πίνακα στο Supabase

1. Μπείτε στο [supabase.com](https://supabase.com) και δημιουργήστε (ή ανοίξτε) το project σας.
2. Πηγαίνετε **SQL Editor > New query**.
3. Αντιγράψτε όλο το περιεχόμενο του αρχείου `supabase/schema.sql` και πατήστε **Run**.
   - Αυτό δημιουργεί τον πίνακα `interest_submissions` με τις στήλες: `id`, `sport`,
     `child_name`, `child_age`, `child_gender`, `child_city`, `guardian_name`,
     `guardian_phone`, `created_at`.
   - Ενεργοποιεί Row Level Security και επιτρέπει **μόνο** εισαγωγή (insert) νέων
     εγγραφών από τη φόρμα. Κανείς επισκέπτης δεν μπορεί να διαβάσει, να
     τροποποιήσει ή να κατεβάσει τις υποβολές άλλων.

## 2. Στοιχεία σύνδεσης

Στο Supabase Dashboard: **Project Settings > API**, θα βρείτε:

- **Project URL** → `VITE_SUPABASE_URL`
- **anon public key** → `VITE_SUPABASE_ANON_KEY`

Το `anon` κλειδί είναι ασφαλές να εκτεθεί στον client-side κώδικα — δεν δίνει
πρόσβαση ανάγνωσης λόγω των πολιτικών RLS που ορίσαμε παραπάνω.

## 3. Τοπική εκτέλεση

```bash
npm install
cp .env.example .env
# ανοίξτε το .env και συμπληρώστε τις πραγματικές τιμές
npm run dev
```

## 4. Δημοσίευση στο Vercel

1. Ανεβάστε τον φάκελο σε ένα repository (GitHub/GitLab/Bitbucket).
2. Στο [vercel.com](https://vercel.com), **New Project** → επιλέξτε το repository.
   Το Vercel αναγνωρίζει αυτόματα ότι είναι Vite project.
3. Στο βήμα **Environment Variables**, προσθέστε:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. **Deploy**.

Οι μεταβλητές περιβάλλοντος μένουν αποκλειστικά στις ρυθμίσεις του Vercel και
του τοπικού `.env` (που δεν ανεβαίνει ποτέ στο Git, βλ. `.gitignore`) — δεν
εμφανίζονται πουθενά μέσα στον πηγαίο κώδικα.

## 5. Πώς θα βλέπετε τις υποβολές

Μέσω του **Supabase Dashboard > Table Editor > interest_submissions**, συνδεδεμένοι
ως ιδιοκτήτης του project. Μπορείτε επίσης να εξάγετε τα δεδομένα σε CSV απευθείας
από εκεί (κουμπί "Export" στο Table Editor).

## 6. Πολιτική Απορρήτου

Ο σύνδεσμος «Πολιτική Απορρήτου» στη φόρμα δείχνει προς το `/privacy`. Προσθέστε
τη δική σας σελίδα πολιτικής απορρήτου σε αυτή τη διαδρομή, ή αλλάξτε το `href`
στο `src/App.jsx` ώστε να δείχνει στην υπάρχουσα σελίδα σας.

## Δομή έργου

```
├── index.html
├── package.json
├── vite.config.js
├── .env.example          ← αντιγράψτε το σε .env (τοπικά μόνο)
├── public/
│   └── logo.png
├── src/
│   ├── main.jsx
│   ├── App.jsx            ← η φόρμα
│   └── supabaseClient.js  ← σύνδεση με Supabase μέσω env vars
└── supabase/
    └── schema.sql          ← SQL για τον πίνακα + RLS policies
```
