---
title: Linear Regulator
summary: A discrete power-supply design exploring feedback, protection, and the path from circuit simulation to PCB layout.
discipline: Hardware / Analog
status: In development
tags: [KiCad, LTspice, Analog design]
order: 1
featured: true
cover: ../../../assets/img/projects/linear-regulator/Regulador-3d.png
coverAlt: Top-down KiCad render of the linear regulator PCB, showing its components, test points, and input and output connections.
model: /models/linear-regulator.glb
facts:
  - label: Output targets
    value: 5 V / 3.3 V
  - label: Focus
    value: Feedback & protection
  - label: Current stage
    value: Design & PCB layout
---

## The project

A linear power supply for prototyping and bench rails, designed to explore the behavior of a discrete regulator. The work brings together analog circuit design, feedback, protection, and the practical decisions involved in a PCB layout.

The intended outputs are 5 V and 3.3 V. These are design targets; measured output performance is not yet documented here.

## Design questions

The useful part of this project is the reasoning between the schematic and the board:

- **Feedback:** how the regulation loop behaves as the input voltage and load change.
- **Protection:** how the circuit should respond to an overload or short circuit.
- **Thermals:** how power dissipation affects component selection and layout.
- **Measurement:** how test points and return paths make the circuit easier to inspect.

## From circuit to board

KiCad and LTspice support the design process. The PCB render and interactive model show the CAD design, including component placement, connections, and test points.

The model is a design artifact. It does not establish that the board has been manufactured, assembled, or tested.

## Validation plan

The next documentation milestone is a set of measurements with recorded input voltage, load, ambient temperature, and instrumentation:

| Check | What to record |
| --- | --- |
| Output accuracy | Output voltage across the intended load range |
| Load and line regulation | Voltage change as the load and input change |
| Ripple | Output ripple with a short oscilloscope ground connection |
| Transient response | Voltage excursion and recovery after a load step |
| Thermal behavior | Temperature rise of the power components |
| Protection | Current and temperature during overload conditions |

## Project status

This case study is in development. The published material currently documents the PCB design. Schematics, a reviewed component list, and measurement results will be added as the documentation is completed.
