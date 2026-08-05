import React from "react";

export default function Field({ label, required, error, id, children }) {
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
