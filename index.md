---
layout: default
title: Home
---

<div class="home-wrapper">
  <div class="business-card">

    <h1>Marcos Verdejo Bosch</h1>
    <span class="role">Electronic Engineer</span>

    <div class="bio">
      Focused on
      <span class="hl">hardware design</span>
      <span class="hl">embedded systems</span>
      <span class="hl">analog circuits</span>.
    </div>

    <div class="stack">
      KiCad · LTspice
    </div>

    <div class="card-links">
      <a href="https://github.com/MarcosVerdejoBosch" target="_blank" rel="noopener">GitHub</a>
      <a href="https://www.linkedin.com/in/marcos-verdejo-bosch-7b85b4300/" target="_blank" rel="noopener">LinkedIn</a>
      <a href="#" id="email-btn" onclick="copyEmail(); return false;">Email</a>
    </div>

  </div>
</div>

<script>
  // Copy email to clipboard and show a short "Copied" feedback state.
  function copyEmail() {
    const email = "marcosverdejo@gmail.com";
    const btn = document.getElementById("email-btn");

    navigator.clipboard.writeText(email).then(() => {
      const originalText = "Email";

      btn.innerText = "Copied";
      btn.classList.add("email-copied");

      setTimeout(() => {
        btn.innerText = originalText;
        btn.classList.remove("email-copied");
      }, 2000);
    }).catch(err => {
      console.error("Clipboard copy failed:", err);
    });
  }
</script>
