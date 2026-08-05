import React, { useState } from "react";
import { supabase } from "./supabaseClient";

/* ---------------------------------------------------------
   Φόρμα Εκδήλωσης Ενδιαφέροντος — ACT4 Gymnastics
   Συνδεδεμένη με Supabase (πίνακας: interest_submissions)
   --------------------------------------------------------- */

const SPORTS = [
  { key: "Ενόργανη Γυμναστική", desc: "Δύναμη και ισορροπία στα όργανα." },
  { key: "Ρυθμική Γυμναστική", desc: "Κομψότητα και ρυθμός στην κίνηση." },
  { key: "Γυμναστική για Όλους", desc: "Άσκηση και ομαδικότητα." },
];

const emptyForm = {
  sport: "",
  childName: "",
  childAge: "",
  childGender: "",
  childCity: "",
  guardianName: "",
  guardianPhone: "",
  consent: false,
};

function isValidPhone(v) {
  return /^[0-9\s+()-]{10,15}$/.test(v);
}

export default function InterestForm() {
  const [data, setData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (patch) => setData((d) => ({ ...d, ...patch }));

  const validate = () => {
    const e = {};
    if (!data.sport) e.sport = "Επιλέξτε άθλημα";
    if (!data.childName.trim()) e.childName = "Υποχρεωτικό πεδίο";
    if (!data.childAge.trim()) e.childAge = "Υποχρεωτικό πεδίο";
    else if (!/^\d{1,2}$/.test(data.childAge.trim()) || Number(data.childAge) <= 0 || Number(data.childAge) > 99)
      e.childAge = "Μη έγκυρη ηλικία";
    if (!data.childGender) e.childGender = "Επιλέξτε φύλο";
    if (!data.childCity.trim()) e.childCity = "Υποχρεωτικό πεδίο";
    if (!data.guardianName.trim()) e.guardianName = "Υποχρεωτικό πεδίο";
    if (!data.guardianPhone.trim()) e.guardianPhone = "Υποχρεωτικό πεδίο";
    else if (!isValidPhone(data.guardianPhone)) e.guardianPhone = "Μη έγκυρος αριθμός τηλεφώνου";
    if (!data.consent) e.consent = "Απαιτείται συναίνεση για να προχωρήσετε";
    setErrors(e);
    return e;
  };

  const handleSubmit = async () => {
    if (saving) return; // αποτρέπει διπλές υποβολές

    const e = validate();
    const keys = Object.keys(e);
    if (keys.length > 0) {
      const el = document.getElementById(`f-${keys[0]}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSaving(true);
    setSubmitError("");

    const { error } = await supabase.from("interest_submissions").insert({
      sport: data.sport,
      child_name: data.childName.trim(),
      child_age: Number(data.childAge),
      child_gender: data.childGender,
      child_city: data.childCity.trim(),
      guardian_name: data.guardianName.trim(),
      guardian_phone: data.guardianPhone.trim(),
    });

    if (error) {
      console.error("Supabase insert error:", error);
      setSubmitError("Η υποβολή δεν ολοκληρώθηκε. Παρακαλώ δοκιμάστε ξανά.");
      setSaving(false);
      return;
    }

    setSaving(false);
    setSubmitted(true);
  };

  return (
    <div className="page">
      <GlobalStyles />
      <div className="wrap">
        {submitted ? (
          <div className="card success-card">
            <img src="/logo.png" alt="ACT4 Gymnastics" className="logo logo-success" />
            <div className="success-icon">✓</div>
            <h2>Ευχαριστούμε για το ενδιαφέρον σας!</h2>
            <p>
              Λάβαμε την εκδήλωση ενδιαφέροντος για τον/την <strong>{data.childName}</strong> στο{" "}
              <strong>{data.sport}</strong>. Η γραμματεία μας θα επικοινωνήσει σύντομα μαζί σας.
            </p>
            <button
              className="btn-primary"
              onClick={() => {
                setData(emptyForm);
                setErrors({});
                setSubmitError("");
                setSubmitted(false);
              }}
            >
              Νέα Υποβολή
            </button>
          </div>
        ) : (
          <div className="card">
            <div className="header">
              <img src="/logo.png" alt="ACT4 Gymnastics" className="logo" />
              <h1>Εκδήλωση Ενδιαφέροντος</h1>
              <p>Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.</p>
            </div>

            {/* Άθλημα */}
            <section className="section" id="f-sport">
              <h3 className="section-title">Άθλημα</h3>
              {errors.sport && <div className="field-error" style={{ marginBottom: 10 }}>{errors.sport}</div>}
              <div className="sport-grid">
                {SPORTS.map((s) => (
                  <button
                    type="button"
                    key={s.key}
                    className={`sport-card ${data.sport === s.key ? "selected" : ""}`}
                    onClick={() => update({ sport: s.key })}
                  >
                    <div className="sport-title">{s.key}</div>
                    <div className="sport-desc">{s.desc}</div>
                  </button>
                ))}
              </div>
            </section>

            {/* Παιδί */}
            <section className="section">
              <h3 className="section-title">Στοιχεία Παιδιού</h3>
              <div className="grid-2">
                <Field label="Ονοματεπώνυμο παιδιού" required error={errors.childName} id="f-childName">
                  <input className="input" value={data.childName} onChange={(e) => update({ childName: e.target.value })} />
                </Field>
                <Field label="Ηλικία" required error={errors.childAge} id="f-childAge">
                  <input className="input" inputMode="numeric" value={data.childAge} onChange={(e) => update({ childAge: e.target.value.replace(/[^\d]/g, "") })} />
                </Field>
                <Field label="Φύλο" required error={errors.childGender} id="f-childGender">
                  <div className="choice-row">
                    {["Αγόρι", "Κορίτσι"].map((opt) => (
                      <label key={opt} className={`choice ${data.childGender === opt ? "checked" : ""}`}>
                        <input type="radio" checked={data.childGender === opt} onChange={() => update({ childGender: opt })} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </Field>
                <Field label="Τόπος κατοικίας" required error={errors.childCity} id="f-childCity">
                  <input className="input" value={data.childCity} onChange={(e) => update({ childCity: e.target.value })} />
                </Field>
              </div>
            </section>

            {/* Κηδεμόνας */}
            <section className="section">
              <h3 className="section-title">Στοιχεία Κηδεμόνα</h3>
              <div className="grid-2">
                <Field label="Ονοματεπώνυμο" required error={errors.guardianName} id="f-guardianName">
                  <input className="input" value={data.guardianName} onChange={(e) => update({ guardianName: e.target.value })} />
                </Field>
                <Field label="Αριθμός τηλεφώνου" required error={errors.guardianPhone} id="f-guardianPhone">
                  <input className="input" value={data.guardianPhone} onChange={(e) => update({ guardianPhone: e.target.value })} />
                </Field>
              </div>
            </section>

            {/* Συναίνεση */}
            <section className="section" id="f-consent">
              <label className={`consent ${errors.consent ? "consent-error" : ""}`}>
                <input type="checkbox" checked={data.consent} onChange={(e) => update({ consent: e.target.checked })} />
                <span>
                  Συναινώ στη συλλογή και επεξεργασία των παραπάνω στοιχείων από τη σχολή, αποκλειστικά για την
                  επικοινωνία σχετικά με τα αθλητικά προγράμματα.
                </span>
              </label>
              {errors.consent && <div className="field-error" style={{ marginTop: 6 }}>{errors.consent}</div>}
              <a className="privacy-link" href="/privacy" target="_blank" rel="noopener noreferrer">
                Πολιτική Απορρήτου
              </a>
            </section>

            {submitError && <div className="submit-error">{submitError}</div>}

            <button className="btn-primary btn-submit" onClick={handleSubmit} disabled={saving}>
              {saving ? "Αποστολή…" : "Υποβολή Εκδήλωσης Ενδιαφέροντος"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, required, error, id, children }) {
  return (
    <label className="field" id={id}>
      <span className="field-label">
        {label} {required && <span className="req">*</span>}
      </span>
      {children}
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      :root {
        --blue: #4E9CA3;
        --blue-dark: #3A7D84;
        --blue-light: #EAF5F5;
        --coral: #F15D56;
        --coral-dark: #D8443D;
        --ink: #17323A;
        --muted: #6B8085;
        --border: #DCEAEA;
        --error: #D8443D;
      }
      * { box-sizing: border-box; }
      
