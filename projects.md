---
layout: page
title: Projects
permalink: /projects/
---

## Discrete Linear Voltage Regulator (5V / 3.3V)

![Linear Regulator PCB Render](assets/img/regulator.jpg)

A fully discrete linear power supply designed to explore the fundamentals of feedback loops, error amplifiers, and pass elements without relying on integrated regulators like the LM7805.

**Key Specifications:**
* **Input:** 12V DC (Wall adapter or bench supply).
* **Output:** Dual rail 5V and 3.3V @ 800mA max.
* **Topology:** Series Linear Regulator with BJT pass element.
* **Protection:** Active **Foldback Current Limiting** to protect against short circuits.

### Design Highlights

Instead of using an off-the-shelf IC, this circuit uses a **Zener diode** as a voltage reference and a differential pair as an error amplifier to drive the Darlington pass transistor.

The standout feature is the **Foldback Current Limiting** mechanism. In the event of a short circuit, the output current is actively reduced to a safe level (approx. 50mA) rather than staying at the maximum peak, preventing the pass transistor from overheating and failing.

Designed in **KiCad** with manual routing focused on thermal dissipation for the TO-220 transistors.

[View Schematic on GitHub](https://github.com/MarcosVerdejoBosch) | [Download Gerbers](#)

<br>

---

## IoT Sensor Node (ESP32)

![IoT Node Image](assets/img/iot-node.jpg)

*(Coming soon... This section is a placeholder for your next project)*
