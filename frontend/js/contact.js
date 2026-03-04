// ============================================================
// SareeKart — Contact Page JS
// ============================================================

/**
 * Handle contact form submission
 */
async function handleContactSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const btn = document.getElementById("contact-btn");
  const successToast = document.getElementById("success-toast");
  const errorToast = document.getElementById("error-toast");

  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  // Hide previous toasts
  successToast.classList.remove("show");
  errorToast.classList.remove("show");

  // Button loading state
  btn.textContent = "Sending...";
  btn.disabled = true;

  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Something went wrong");
    }

    // Success
    successToast.classList.add("show");
    form.reset();
    btn.textContent = "Message Sent ✓";

    setTimeout(() => {
      btn.textContent = "Send Message";
      btn.disabled = false;
    }, 3000);
  } catch (error) {
    errorToast.querySelector(".error-msg").textContent = error.message;
    errorToast.classList.add("show");
    btn.textContent = "Send Message";
    btn.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (form) form.addEventListener("submit", handleContactSubmit);
});
