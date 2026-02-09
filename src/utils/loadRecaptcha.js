/**
 * Load reCAPTCHA Enterprise script only when needed (e.g. Login/Register).
 * Keeps the script off the critical path so home page loads faster.
 */
const SCRIPT_URL =
  "https://www.google.com/recaptcha/enterprise.js?render=6LdUESwsAAAAACuiPPH1-KFwv_dY7WLdo-xgXHIu";

let loadPromise = null;

export function loadRecaptchaScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha?.enterprise) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    if (document.querySelector(`script[src*="recaptcha/enterprise"]`)) {
      const check = () => {
        if (window.grecaptcha?.enterprise) resolve();
        else setTimeout(check, 50);
      };
      check();
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      const check = () => {
        if (window.grecaptcha?.enterprise) resolve();
        else setTimeout(check, 50);
      };
      check();
    };
    script.onerror = () => reject(new Error("reCAPTCHA script failed to load"));
    document.head.appendChild(script);
  });

  return loadPromise;
}
