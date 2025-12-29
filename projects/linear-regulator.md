---
layout: default
title: Linear Regulator Report
permalink: /projects/linear-regulator/
---

<div class="report-grid">

  <div class="report-content">

    <h1 style="margin-top: 0;">Discrete Linear Regulator</h1>
    <p style="color: var(--muted); font-size: 0.9rem; margin-top: -1.5rem;">ENGINEERING REPORT & ANALYSIS</p>

    <div style="width: 100%; height: 450px; background-color: #eceff4; border: 1px solid var(--line); border-radius: 8px; margin: 2rem 0; overflow: hidden; position: relative;">
      <model-viewer 
        src="/assets/img/projects/linear-regulator/regulator.glb" 
        alt="3D PCB Model"
        auto-rotate 
        camera-controls 
        shadow-intensity="1.2"
        shadow-softness="0.5"
        exposure="1.0"
        style="width: 100%; height: 100%;"
        camera-orbit="45deg 55deg 105%">
      </model-viewer>
      <div style="position: absolute; bottom: 10px; right: 15px; color: #4c566a; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; pointer-events: none;">
        Interactive 3D View
      </div>
    </div>

    <h2 id="abstract">1. Abstract</h2>
    <p>The goal of this project was to design a robust, low-noise linear power supply without using integrated regulators (like LM7805). The focus was on understanding feedback loops, thermal management, and active protection circuitry.</p>

    <h2 id="architecture">2. System Architecture</h2>
    <p>The topology is a classic <strong>Series Linear Regulator</strong> utilizing a Darlington pair for high current gain.</p>
    <ul>
      <li><strong>Reference:</strong> 5.1V Zener Diode (Temperature compensated).</li>
      <li><strong>Error Amplifier:</strong> Long-tailed pair (Differential Amplifier) for precise voltage tracking.</li>
      <li><strong>Pass Element:</strong> TIP41C (NPN) driven by BD139.</li>
    </ul>

    <h2 id="foldback">3. Foldback Protection</h2>
    <p>Unlike standard constant current limiting, this design implements <strong>Foldback Limiting</strong>.</p>
    <blockquote>
      <strong>Behavior:</strong> When V_out drops due to a short circuit, the current limit is dynamically reduced.
    </blockquote>
    <p>This prevents the pass transistor from dissipating excessive power during a fault, allowing for a safer and more reliable operation.</p>

    <h2 id="pcb-design">4. PCB Design</h2>
    <p>Designed in <strong>KiCad</strong>. The layout prioritizes separation of power and signal grounds (Kelvin connection), wide traces for high-current paths, and thermal relief for manual soldering ease.</p>

    <h2 id="conclusion">5. Conclusion</h2>
    <p>The discrete regulator successfully maintains 5V output with &lt;10mV ripple at full load (800mA). The foldback mechanism triggers at 950mA, folding back to 50mA, successfully protecting the BJT.</p>

    <br><hr><br>
    <a href="/projects/">← Back to Projects</a>

  </div> <aside class="toc-sidebar">
    <h4>Contents</h4>
    <ul>
      <li><a href="#abstract">1. Abstract</a></li>
      <li><a href="#architecture">2. Architecture</a></li>
      <li><a href="#foldback">3. Protection</a></li>
      <li><a href="#pcb-design">4. PCB Design</a></li>
      <li><a href="#conclusion">5. Conclusion</a></li>
      <li><a href="#top" style="font-size: 0.8rem; margin-top: 1rem; display: block;">↑ Top</a></li>
    </ul>
  </aside>

</div>
