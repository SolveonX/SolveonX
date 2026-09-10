/* Phase 4 — inline form validation + success animation */
(function () {
  function showError(group, message) {
    group.classList.add("has-error");
    let err = group.querySelector(".field-error");
    if (!err) {
      err = document.createElement("span");
      err.className = "field-error";
      group.appendChild(err);
    }
    err.textContent = message;
  }

  function clearError(group) {
    group.classList.remove("has-error");
    group.querySelector(".field-error")?.remove();
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validatePhone(value) {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 10;
  }

  window.initFormValidation = function initFormValidation() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("sent") === "1") {
      const success = document.getElementById("form-success");
      if (success) {
        success.classList.remove("hidden");
        success.innerHTML = `
          <div class="form-success-state">
            <div class="check" aria-hidden="true">✓</div>
            <strong>Message sent</strong>
            <p>We will reply by email shortly. For a faster audit, message us on WhatsApp too.</p>
          </div>`;
      }
      form.classList.add("hidden");
    }

    form.querySelectorAll("input, textarea, select").forEach((field) => {
      field.addEventListener("blur", () => {
        const group = field.closest(".form-group");
        if (!group) return;
        clearError(group);
        if (field.required && !String(field.value).trim()) {
          showError(group, "This field is required.");
        } else if (field.type === "email" && field.value && !validateEmail(field.value)) {
          showError(group, "Enter a valid email.");
        } else if ((field.name === "phone" || field.type === "tel") && field.value && !validatePhone(field.value)) {
          showError(group, "Enter a valid WhatsApp number.");
        }
      });
    });

    form.addEventListener("submit", (e) => {
      let ok = true;
      form.querySelectorAll(".form-group").forEach((group) => {
        const field = group.querySelector("input, textarea, select");
        if (!field) return;
        clearError(group);
        if (field.required && !String(field.value).trim()) {
          showError(group, "This field is required.");
          ok = false;
        } else if (field.type === "email" && field.value && !validateEmail(field.value)) {
          showError(group, "Enter a valid email.");
          ok = false;
        } else if ((field.name === "phone" || field.type === "tel") && field.value && !validatePhone(field.value)) {
          showError(group, "Enter a valid WhatsApp number.");
          ok = false;
        }
      });
      if (!ok) e.preventDefault();
    });
  };
})();
