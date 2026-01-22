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
      <span class="hl">hardware design</span>
      <span class="hl">embedded systems</span>
      <span class="hl">analog circuits</span>
    </div>





    

    <div class="card-links">
      <a href="https://github.com/MarcosVerdejoBosch" target="_blank" rel="noopener noreferrer" class="icon-link" title="GitHub" aria-label="GitHub">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .5C5.73.5.75 5.7.75 12.12c0 5.14 3.31 9.5 7.9 11.04.58.11.79-.26.79-.57v-2.1c-3.21.72-3.89-1.26-3.89-1.26-.53-1.4-1.28-1.77-1.28-1.77-1.05-.74.08-.73.08-.73 1.16.08 1.77 1.23 1.77 1.23 1.03 1.82 2.7 1.3 3.36.99.1-.77.4-1.3.72-1.6-2.56-.3-5.25-1.32-5.25-5.88 0-1.3.44-2.36 1.17-3.2-.12-.3-.51-1.52.11-3.16 0 0 .96-.32 3.14 1.22a10.5 10.5 0 0 1 2.86-.4c.97 0 1.94.14 2.86.4 2.18-1.54 3.14-1.22 3.14-1.22.62 1.64.23 2.86.11 3.16.73.84 1.17 1.9 1.17 3.2 0 4.57-2.7 5.58-5.28 5.88.41.37.78 1.1.78 2.22v3.3c0 .31.21.68.8.57 4.58-1.54 7.89-5.9 7.89-11.04C23.25 5.7 18.27.5 12 .5z"/>
        </svg>
      </a>

      <a href="https://www.linkedin.com/in/marcos-verdejo-bosch-7b85b4300/" target="_blank" rel="noopener noreferrer" class="icon-link" title="LinkedIn" aria-label="LinkedIn">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.65-1.85 3.39-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/>
        </svg>
      </a>

      <button type="button" class="icon-link js-copy-email" title="Copy Email" aria-label="Copy email address" data-email="marcosverdejo@gmail.com">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"/>
        </svg>
        <span class="copy-tooltip" aria-live="polite"></span>
      </button>
    </div>

  </div>
</div>

<script>
(function () {
  const btn = document.querySelector(".js-copy-email");
  if (!btn) return;

  const tooltip = btn.querySelector(".copy-tooltip");
  const email = btn.getAttribute("data-email") || "";

  let timer;

  const showTooltip = (message) => {
    if (!tooltip) return;
    tooltip.textContent = message;
    tooltip.classList.add("visible");
    clearTimeout(timer);
    timer = setTimeout(() => {
      tooltip.classList.remove("visible");
      tooltip.textContent = "";
    }, 1500);
  };

  const onSuccess = () => {
    btn.classList.add("email-copied");
    showTooltip("Copied!");
    setTimeout(() => btn.classList.remove("email-copied"), 2000);
  };

  const onFail = (err) => {
    console.error("Clipboard copy failed:", err);
    showTooltip("Failed");
  };

  btn.addEventListener("click", async () => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(email);
        onSuccess();
      } catch (e) {
        onFail(e);
      }
      return;
    }

    try {
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      ok ? onSuccess() : onFail("execCommand failed");
    } catch (e) {
      onFail(e);
    }
  });
})();
</script>
