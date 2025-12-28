---
layout: default
title: Linear Regulator Report
permalink: /projects/linear-regulator/
---

# Discrete Linear Voltage Regulator
### Engineering Report & Analysis

<div style="width: 100%; height: 400px; background: var(--bg-alt); border: 1px solid var(--line); border-radius: 8px; margin-bottom: 2rem;">
  <model-viewer 
    src="/assets/img/projects/linear-regulator/regulator.glb" 
    alt="3D PCB Model"
    auto-rotate 
    camera-controls 
    style="width: 100%; height: 100%;">
  </model-viewer>
</div>

## 1. Abstract
The goal of this project was to design a robust, low-noise linear power supply without using integrated regulators (like LM7805). The focus was on understanding feedback loops, thermal management, and active protection circuitry.

## 2. System Architecture
The topology is a classic **Series Linear Regulator** utilizing a Darlington pair for high current gain.

* **Reference:** 5.1V Zener Diode (Temperature compensated).
* **Error Amplifier:** Long-tailed pair (Differential Amplifier) for precise voltage tracking.
* **Pass Element:** TIP41C (NPN) driven by BD139.

## 3. Key Feature: Foldback Current Limiting
Unlike standard constant current limiting, this design implements **Foldback Limiting**.
<br>
> **Behavior:** When $V_{out}$ drops due to a short circuit, the current limit $I_{limit}$ is dynamically reduced.

This prevents the pass transistor from dissipating excessive power ($P_D = V_{in} \times I_{short}$) during a fault, allowing for a safer and more reliable operation.

## 4. PCB Design & Layout
Designed in **KiCad**. The layout prioritizes:
* Separation of power and signal grounds (Kelvin connection).
* Wide traces for high-current paths.
* Thermal relief for manual soldering ease.

## 5. Conclusion
The discrete regulator successfully maintains 5V output with <10mV ripple at full load (800mA). The foldback mechanism triggers at 950mA, folding back to 50mA, successfully protecting the BJT.

<br>
<hr>
<br>

[← Back to Projects](/projects/)
