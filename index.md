---
layout: default
title: Home
---

<div class="home-wrapper">

  <div class="business-card">
    
    <h1>Marcos Verdejo Bosch</h1>
    <span class="role">Electronic Engineer</span>

    <div class="bio">
      Focused on <strong>hardware design</strong>, <strong>embedded intelligence</strong>, and <strong>analog circuits</strong>.
      <br>
      Creating reliable systems that bridge the physical and digital worlds.
    </div>

    <div class="stack">
      KiCad · C/C++ · ESP32 · IoT · Kubernetes
    </div>

    <div class="card-links">
      <a href="https://github.com/MarcosVerdejoBosch" target="_blank">GitHub</a>
      <a href="https://www.linkedin.com/in/marcos-verdejo-bosch-7b85b4300/" target="_blank">LinkedIn</a>
      <a id="email-btn" onclick="copyEmail()">Email</a>
    </div>

  </div>

</div>

<script>
  function copyEmail() {
    const email = "marcosverdejo@gmail.com";
    const btn = document.getElementById("email-btn");
    
    // Copiar al portapapeles
    navigator.clipboard.writeText(email).then(() => {
      
      // Guardar el texto original
      const originalText = "Email";
      
      // Cambiar texto y estilo visualmente
      btn.innerText = "Copied"; // Cambio realizado aquí
      btn.classList.add("email-copied");
      
      // Esperar 2 segundos y volver a la normalidad
      setTimeout(() => {
        btn.innerText = originalText;
        btn.classList.remove("email-copied");
      }, 2000);
      
    }).catch(err => {
      console.error('Error al copiar: ', err);
    });
  }
</script>
