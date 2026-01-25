---
layout: default
title: Linear Regulator Report
permalink: /projects/linear-regulator/
---

<div class="case-study">
<h1>Linear Regulator</h1>
<p class="caption">ENGINEERING REPORT &amp; ANALYSIS</p>

<div class="figure">
  <model-viewer
    src="{{ "/assets/img/projects/linear-regulator/regulador.min.glb" | relative_url }}"
    alt="3D PCB Model"
    camera-controls
    interaction-prompt="none"
    interaction-prompt-threshold="0"
    minimum-render-scale="1"
    maximum-render-scale="2"
    exposure="1.25"
    shadow-intensity="0"
    environment-image="neutral"
    tone-mapping="aces"
    interpolation-decay="200"
    camera-orbit="45deg 60deg 120%"
    style="display:block;width:100%;height:clamp(320px,55vh,520px);transform:translate3d(0,0,0);will-change:transform;"
  ></model-viewer>
  <div class="caption">Interactive 3D View</div>
</div>


<h2 id="overview">Overview</h2>
<p>
  This project focuses on a discrete linear regulator built without monolithic IC regulators, emphasizing feedback
  behavior, protection circuitry, and layout decisions for low-noise output. The case study outlines design intent,
  implementation notes, and a validation plan before results are finalized.
</p>

<h2 id="requirements">Requirements / Constraints</h2>
<ul>
  <li>Regulated 5V output with low ripple under load.</li>
  <li>Discrete topology (no integrated regulator ICs).</li>
  <li>Robust short-circuit protection behavior.</li>
  <li>Thermal performance compatible with continuous load operation.</li>
</ul>

<h2 id="architecture">Architecture / Key Design Decisions</h2>
<ul>
  <li><strong>Topology:</strong> Series linear regulator with a Darlington pass stage.</li>
  <li><strong>Reference:</strong> 5.1V temperature-compensated Zener reference.</li>
  <li><strong>Error Amplifier:</strong> Long-tailed pair for voltage tracking stability.</li>
  <li><strong>Protection:</strong> Foldback current limiting to reduce dissipation during faults.</li>
</ul>

<h2 id="implementation">Implementation Notes</h2>
<ul>
  <li>PCB layout separates power and signal grounds with Kelvin connections.</li>
  <li>Wide copper pours on high-current paths to reduce IR drop.</li>
  <li>Thermal reliefs applied for serviceability and rework.</li>
</ul>

<h2 id="validation">Validation Plan</h2>
<ul>
  <li><strong>Output accuracy:</strong> Measure Vout across load range with a calibrated DMM.</li>
  <li><strong>Ripple:</strong> Measure mVpp with oscilloscope + short ground spring.</li>
  <li><strong>Load/line regulation:</strong> Step load and supply input, log Vout changes.</li>
  <li><strong>Transient response:</strong> Step load and capture ΔV and recovery time.</li>
  <li><strong>Thermals:</strong> Record heatsink and pass device rise with thermocouple.</li>
  <li><strong>Short-circuit behavior:</strong> Observe foldback current and device temperature.</li>
</ul>

<h2 id="results">Results</h2>
<table class="results-table">
  <thead>
    <tr>
      <th>Metric</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Output accuracy</td><td>TBD</td></tr>
    <tr><td>Load regulation</td><td>TBD</td></tr>
    <tr><td>Line regulation</td><td>TBD</td></tr>
    <tr><td>Ripple (mVpp)</td><td>TBD</td></tr>
    <tr><td>Transient response (ΔV, recovery time)</td><td>TBD</td></tr>
    <tr><td>Efficiency (if applicable)</td><td>TBD</td></tr>
    <tr><td>Thermal rise (°C @ load)</td><td>TBD</td></tr>
    <tr><td>Short-circuit behavior</td><td>TBD</td></tr>
  </tbody>
</table>
<p class="caption">Test conditions: TBD (input voltage, load steps, ambient, instrumentation).</p>

<h2 id="limitations">Known Limitations / Next Improvements</h2>
<ul>
  <li>TBD: quantify ripple and stability margins under full load.</li>
  <li>TBD: validate foldback behavior across temperature range.</li>
  <li>TBD: explore thermal optimization and enclosure airflow.</li>
</ul>

<h2 id="artifacts">Artifacts &amp; Links</h2>
<ul>
  <li>Repository: TBD</li>
  <li>Schematic: TBD</li>
  <li>BOM: TBD</li>
  <li>Test data: TBD</li>
</ul>

<br><hr><br>

<a href="{{ "/projects/" | relative_url }}">← Back to Projects</a>
</div>
