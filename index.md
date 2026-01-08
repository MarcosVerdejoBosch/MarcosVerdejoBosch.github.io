---
layout: default
title: Home
class: home
---

<div class="home-wrapper">
  <div class="business-card">

    <h1>Marcos Verdejo Bosch</h1>
    <span class="role">Electronic Engineer</span>

    <div class="bio">
      Focused on 
      <span class="hl">hardware design</span>
      <span class="hl">embedded systems</span>
      <span class="hl">analog circuits</span>
    </div>

    <div class="card-links">
      <a
        class="icon-link"
        href="https://github.com/MarcosVerdejoBosch"
        target="_blank"
        rel="noopener"
        aria-label="GitHub"
        title="GitHub"
      >
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      </a>

      <a
        class="icon-link"
        href="https://www.linkedin.com/in/marcos-verdejo-bosch-7b85b4300/"
        target="_blank"
        rel="noopener"
        aria-label="LinkedIn"
        title="LinkedIn"
      >
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
        </svg>
      </a>

      <a
        href="#"
        id="email-btn"
        class="icon-link email-link"
        onclick="copyEmail(); return false;"
        aria-label="Copy email"
        title="Copy email"
      >
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      </a>
    </div>

    <div class="stack">
      KiCad · LTspice · Python
    </div>

  </div>
</div>

<script>
  function copyEmail() {
    const email = "marcosverdejo@gmail.com";
    const btn = document.getElementById("email-btn");

    navigator.clipboard.writeText(email).then(() => {
      // Add class for visual feedback (color change)
      btn.classList.add("email-copied");
      
      // Update accessibility labels
      btn.setAttribute("aria-label", "Email copied");
      btn.setAttribute("title", "Copied: " + email);

      // Remove feedback after 2 seconds
      setTimeout(() => {
        btn.classList.remove("email-copied");
        btn.setAttribute("aria-label", "Copy email");
        btn.setAttribute("title", "Copy email");
      }, 2000);
    }).catch(err => {
      console.error("Clipboard copy failed:", err);
    });
  }
</script>
