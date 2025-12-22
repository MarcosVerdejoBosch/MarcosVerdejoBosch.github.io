---
layout: default
title: Projects
---

<a id="top"></a>

<!--
File: projects.md
Purpose: Professional portfolio of hardware, PCB, and IoT projects.
Author: Marcos Verdejo Bosch
Notes:
- Blog-style, easy to read
- Each project follows the same structure
-->

# Projects

Selected engineering projects focused on **PCB design, hardware, and embedded systems**.

### Index
- [Discrete Linear Voltage Regulator (5V / 3.3V)](#discrete-linear-voltage-regulator-5v--33v)
- [IoT Sensor Node](#iot-sensor-node)
- [Embedded Controller](#embedded-controller)
- [Lab Utilities](#lab-utilities)

<hr style="border: 0; height: 1px; background: linear-gradient(to right, transparent, var(--line), transparent); opacity: 0.6; margin: 2rem 0;">

## Discrete Linear Voltage Regulator (5V / 3.3V)

Low-noise linear voltage regulator designed entirely with discrete components, focused on analog performance and thermal stability.

<!-- Project image: KiCad 3D render -->
<img
  src="{{ '/assets/img/projects/linear-regulator/Regulador-3d.png' | relative_url }}"
  alt="Discrete linear voltage regulator PCB – KiCad 3D view"
/>

**Stack:** `Analog Design` `KiCad` `LTspice` `Power Electronics`

**Highlights:**
- Discrete BJT-based topology for low-noise regulation
- Full schematic, simulation, and PCB layout
- Layout optimized for current paths and thermal behavior
- Test points added for lab validation and measurements

**Links:**  
[GitHub repository (coming soon)](#)

[↑ Back to top](#top)

---

## IoT Sensor Node

Low-power sensor node based on ESP32, designed for battery operation and remote monitoring.

**Stack:** `ESP32` `Embedded C` `IoT` `Low Power Design`

**Highlights:**
- Custom PCB for low-power operation
- Firmware optimized for sleep cycles
- Designed for environmental sensing use cases

[↑ Back to top](#top)

---

## Embedded Controller

ARM-based embedded controller with deterministic real-time logic.

**Stack:** `ARM` `Embedded Systems` `RTOS`

**Highlights:**
- Real-time task scheduling
- Peripheral integration (GPIO, timers, UART)
- Industrial-style control logic

[↑ Back to top](#top)

---

## Lab Utilities

Small tools developed to support hardware testing and validation.

**Stack:** `Python` `C` `Instrumentation`

**Highlights:**
- Measurement and data-logging scripts
- Utilities to speed up lab workflows

[↑ Back to top](#top)
