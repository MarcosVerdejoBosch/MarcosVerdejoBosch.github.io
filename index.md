---
layout: default
title: Home
---

<!--
File: index.md
Purpose: Homepage business card.
Notes:
- Short, clear copy
- Email button copies address to clipboard (fallback to mailto)
-->

<div class="home-wrapper">

  <div class="business-card">

    <h1>Marcos Verdejo Bosch</h1>
    <span class="role">Electronic Engineer</span>

    <div class="bio">
      Focused on <strong>hardware design</strong>, <strong>embedded systems</strong>, and <strong>analog circuits</strong>.
    </div>

    <div class="stack">
      KiCad · LTspice
    </div>

    <div class="card-links">
      <a href="https://github.com/MarcosVerdejoBosch" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/marcos-verdejo-bosch-7b85b4300/" target="_blank" rel="noopener noreferrer">LinkedIn</a>

      <button
        id="email-btn"
        type="button"
        class="email-btn"
        data-email="marcosverdejo@gmail.com"
        aria-label="Copy email to clipboard"
      >
        Email
      </button>
    </div>

  </div>

</div>

<script>
  // Copy email to clipboard and show short feedback (no inline onclick).
  (function () {
    const btn = document.getElementById("email-btn");
    if (!btn) return;

    const originalText = btn.textContent.trim();
    const email = btn.dataset.email;

    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email);

        btn.textContent = "Copied";
        btn.classList.add("email-copied");

        window.setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove("email-copied");
        }, 2000);
      } catch (err) {
        // Fallback: if clipboard fails, open mail client.
        window.location.href = `mailto:${email}`;
      }
    });
  })();
</script>
