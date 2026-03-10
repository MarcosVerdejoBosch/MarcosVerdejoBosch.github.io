---
layout: default
title: Projects
class: projects-page
permalink: /projects/
---

<div class="projects-page__intro">
  <h1>Projects</h1>
</div>

<div class="projects-list">
  <article class="project-card project-card--featured">
    <div class="project-card__body">
      <h3>Linear Regulator</h3>
      <p>A fully discrete 5V/3.3V, 1.5A linear supply for prototyping/bench rails, designed from scratch to learn loop compensation and real-world analog tradeoffs. Uses a TIP42 PNP pass element (low dropout), TL431 reference, and a CA3096 matched-transistor discrete error amplifier, with short-circuit current limiting and reverse-polarity protection (validated in LTspice; PCB in progress).</p>
      <div class="specs">KiCad · LTspice · Analog Design</div>
    </div>
    <div class="project-card__actions">
      <a href="/projects/linear-regulator/" class="btn-report">Open Project Page</a>
    </div>
  </article>

  <article class="project-card project-card--muted">
    <div class="project-card__body">
      <h3>IoT Sensor Node</h3>
      <p>Low-power ESP32 sensing unit with MQTT telemetry and deep-sleep optimization for battery longevity.</p>
      <div class="specs">C++ · ESP32 · GCP · IoT</div>
    </div>
    <div class="project-card__actions">
      <a href="#" class="btn-report btn-report--disabled">Coming Soon</a>
    </div>
  </article>
</div>

