---
title: Linear Regulator
summary: A discrete power supply I built for my bench.
discipline: Hardware / Analog
status: In development
tags: [KiCad, LTspice, Analog design]
order: 1
featured: true
cover: ../../../assets/img/projects/linear-regulator/Regulador-perspectiva.png
coverAlt: KiCad render of the linear regulator PCB viewed at an angle, with raised components and input and output connectors.
model:
  path: /models/linear-regulator.glb
  alt: Interactive 3D model of the linear regulator PCB
facts:
  - label: Output modes
    value: 5 V / 3.3 V
  - label: Focus
    value: Feedback & protection
  - label: Current stage
    value: Assembled prototype
---

<div id="the-project" class="project-anchor" aria-hidden="true">
  <span id="design-questions"></span>
  <span id="from-circuit-to-board"></span>
</div>

## Load-release test

In LTspice, the 3.3 V output peaked at **3.66 V** when the load dropped from 1 A to 0.1 A. It settled within ±1% in about **15 µs**.

<figure class="case-figure">

![Simulated load current drops from 1 A to 0.1 A as the output voltage spikes, dips below 3.3 V, then settles.](../../../assets/img/projects/linear-regulator/load-release-3v3.svg)

<figcaption id="project-status"><span id="validation-plan" aria-hidden="true"></span>LTspice simulation (SIM-06). Bench measurements pending.</figcaption>
</figure>
