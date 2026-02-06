/**
 * Validation helpers for register form fields.
 */
export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || "").trim());

export const isValidMobile = (mobile) =>
  /^[6-9]\d{9}$/.test((mobile || "").replace(/\s/g, ""));

/** Name should not contain numbers and must be at least 2 characters */
export const isValidName = (name) =>
  (name || "").trim().length >= 2 && !/\d/.test((name || "").trim());

/**
 * Validates a single register form field.
 * @param {string} name - Field name: fullName | email | mobile | password | confirmPassword | agreeTerms
 * @param {string|boolean} value - Field value
 * @param {Object} formData - Current form data (needed for confirmPassword and agreeTerms)
 * @returns {string} Error message or empty string if valid
 */
export const validateRegisterField = (name, value, formData) => {
  const v = typeof value === "string" ? value : "";
  const trimV = v.trim();

  if (name === "fullName") {
    if (!trimV) return "Full name is required.";
    if (trimV.length < 2) return "Full name must be at least 2 characters.";
    if (/\d/.test(trimV)) return "Name should not contain numbers.";
    return "";
  }

  if (name === "email") {
    if (!trimV) return "Email is required.";
    if (!isValidEmail(trimV)) return "Please enter a valid email address.";
    return "";
  }

  if (name === "mobile") {
    const m = v.replace(/\s/g, "");
    if (!m) return "Mobile number is required.";
    if (!isValidMobile(m))
      return "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).";
    return "";
  }

  if (name === "password") {
    if (!v) return "Password is required.";
    if (v.length < 8) return "Password must be at least 8 characters long.";
    return "";
  }

  if (name === "confirmPassword") {
    if (!v) return "Please confirm your password.";
    if (v !== formData.password)
      return "Password and confirm password do not match.";
    return "";
  }

  if (name === "agreeTerms") {
    return !value
      ? "You must agree to the Terms of use and Privacy Policy."
      : "";
  }

  return "";
};
