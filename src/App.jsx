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
              
