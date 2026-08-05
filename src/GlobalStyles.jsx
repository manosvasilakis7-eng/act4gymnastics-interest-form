import React from "react";

export default function GlobalStyles() {
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
      .page {
        font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif;
        background: var(--blue-light);
        min-height: 100vh;
        padding: 32px 16px;
      }
      .wrap { max-width: 640px; margin: 0 auto; }
      .card {
        background: #fff;
        border-radius: 20px;
        padding: 32px;
        box-shadow: 0 20px 45px -28px rgba(37,99,235,0.35);
        border: 1px solid var(--border);
      }
      @media (max-width: 560px) {
        .page { padding: 0; }
        .card { border-radius: 0; border: none; padding: 24px 18px 32px; min-height: 100vh; }
      }

      .header { text-align: center; margin-bottom: 28px; }
      .logo { max-width: 190px; height: auto; margin: 0 auto 18px; display: block; }
      .logo-success { max-width: 160px; margin-bottom: 22px; }
      .header h1 { font-size: 24px; color: var(--ink); margin: 0 0 8px; font-weight: 700; }
      .header p { font-size: 14px; color: var(--muted); margin: 0; }

      .section { margin-bottom: 26px; }
      .section-title { font-size: 14px; font-weight: 700; color: var(--blue-dark); text-transform: uppercase; letter-spacing: 0.04em; margin: 0 0 14px; }

      .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      @media (max-width: 520px) { .grid-2 { grid-template-columns: 1fr; } }

      .field { display: flex; flex-direction: column; gap: 6px; }
      .field-label { font-size: 13px; font-weight: 600; color: var(--ink); }
      .req { color: var(--error); }
      .field-error { font-size: 12px; color: var(--error); font-weight: 500; }

      .input {
        border: 1.5px solid var(--border); border-radius: 12px; padding: 12px 14px;
        font-size: 14.5px; font-family: inherit; color: var(--ink); outline: none; width: 100%;
        transition: border-color 0.15s, box-shadow 0.15s;
      }
      .input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px var(--blue-light); }
      .input::placeholder { color: #A0AEC0; }

      .choice-row { display: flex; gap: 10px; }
      .choice {
        flex: 1; text-align: center; border: 1.5px solid var(--border); border-radius: 12px;
        padding: 11px 14px; font-size: 14px; font-weight: 600; color: var(--muted); cursor: pointer;
      }
      .choice input { display: none; }
      .choice.checked { border-color: var(--blue); background: var(--blue-light); color: var(--blue-dark); }

      .sport-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
      @media (min-width: 480px) { .sport-grid { grid-template-columns: 1fr 1fr 1fr; } }
      .sport-card {
        text-align: left; border: 1.5px solid var(--border); border-radius: 14px; padding: 16px;
        background: #fff; cursor: pointer; transition: all 0.15s; font-family: inherit;
      }
      .sport-card:hover { border-color: var(--coral); }
      .sport-card.selected { border-color: var(--coral); background: var(--blue-light); }
      .sport-title { font-weight: 700; font-size: 14.5px; color: var(--ink); margin-bottom: 4px; }
      .sport-desc { font-size: 12px; color: var(--muted); line-height: 1.4; }

      .consent { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--ink); cursor: pointer; line-height: 1.5; }
      .consent input { margin-top: 3px; accent-color: var(--blue); width: 17px; height: 17px; flex-shrink: 0; }
      .consent-error span { color: var(--error); }
      .privacy-link { display: inline-block; margin-top: 8px; margin-left: 27px; font-size: 12.5px; color: var(--blue-dark); font-weight: 600; text-decoration: underline; }

      .submit-error {
        background: #FDECEA; border: 1px solid #F5C6C2; color: var(--error);
        border-radius: 10px; padding: 10px 14px; font-size: 13px; margin-bottom: 14px; font-weight: 500;
      }

      .btn-primary {
        background: var(--blue); color: #fff; border: none; border-radius: 14px;
        padding: 16px 24px; font-size: 15.5px; font-weight: 700; cursor: pointer;
        font-family: inherit; width: 100%; transition: background 0.15s, transform 0.1s;
        box-shadow: 0 12px 24px -10px rgba(37,99,235,0.55);
      }
      .btn-primary:hover:not(:disabled) { background: var(--blue-dark); }
      .btn-primary:active:not(:disabled) { transform: scale(0.99); }
      .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
      .btn-submit { margin-top: 6px; }

      .success-card { text-align: center; padding: 48px 28px; }
      .success-icon {
        width: 64px; height: 64px; border-radius: 50%; background: var(--blue-light); color: var(--blue-dark);
        font-size: 28px; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px;
      }
      .success-card h2 { font-size: 20px; color: var(--ink); margin-bottom: 10px; }
      .success-card p { font-size: 14.5px; color: var(--muted); line-height: 1.6; margin: 0 auto 24px; max-width: 420px; }
    `}</style>
  );
}
