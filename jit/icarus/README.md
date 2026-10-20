# ICARUS — Sunshine movie-to-game experiment

[Development Chronicle](./CHRONICLE.md) — origin, design reasoning, Rocinante-inspired crew/tools/failures, and provisional dev canon.

## Status
**Concept only. No playable implementation authorized yet.** This README records the premise, approved candidate emoji bank, and first conceptual design. Do not interpret proposals as implemented features or permission to build.

## Premise
**Maintain a dying spacecraft approaching the Sun.** A movie-to-game experiment: create a playable, movie-inspired game in the time it takes to watch *Sunshine* (2007). The film is the development clock, but the clock has **not** started. Preserve the joy of watching and discovering mechanics; avoid building a general-purpose framework first.

Play **from outside** the spacecraft, side-on, with legible emojis. The ship is a tiny vulnerable, interconnected civilization approaching the Sun. Prefer simultaneous visibility of its compartments and their interactions over walking through detailed interiors or constructing a dashboard simulator. The Sun might grow larger as the journey progresses; movement model remains undecided.

## First conceptual design — Icarus II
A modest exterior-visible ship, with a large Sun-facing shield and connected compartments. This is conceptual anatomy, **not** final geometry:

```text
       ship / aft                         Sun / forward
  [ 🌱 GARDEN ]—[ 🧑‍🚀 HABITAT ]—[ 🧊 COOLANT ]—🛡️  ☀️
                    ⚡ shared power / atmosphere / heat
```

- **🌱 Garden:** 💧 + 🔆 + 🌱 → plant growth and breathable atmosphere; overheating can cause 🔥, threatening life support.
- **🧊 Coolant:** 🛢️ + ⚙️ + 🔋 circulate coolant; faults raise 🌡️ and threaten connected machinery.
- **🛡️ Solar shield:** orientation determines exposure; misalignment causes localized heat and damage.
- **🧑‍🚀 Crew:** autonomous local actors travel through 🚪 connections, carry supplies, repair failures, and respond to hazards.
- **Coupling:** garden, coolant, shield, power, and crew affect one another; consequences should be visible and causally earned, not abstract meters alone.
- **First possible playable slice, NOT approved for implementation:** one astronaut, garden, coolant pump, shield. Victory condition and ship movement remain open.

## Candidate foundations — inspect before choosing
- `bonoj/bonoj.github.io/jit/evermore-2/`: single mobile viewport HTML/CSS/Canvas; autonomous agents, plants, water, fire, physical material transfers. Favor its external, legible 2D presentation; **do not** import Tiffany's entire civilization by default.
- Hermeticon / Genesis: 3D terrain, populations, environmental interactions; potential ideas, not an integration commitment.
- Orbital Construction: Astra's existing detailed modular spacecraft exteriors, ports and greebling. Interior mode is not ready; the desired game remains externally played. May serve as visual/structural reference without requiring a 3D engine.

Do not modify these source worlds for this concept. No new game UI or executable has been requested.

## Approved candidate emoji bank
The human selected these candidates from a larger bank. They are approved **candidates**, not mandatory features. Do not silently reintroduce rejected icons.

Spacecraft & structure: 🚀 🛰️ 🛡️ ⚙️ 🔩 🔧 🪛 🔨 🧰 ⛓️ 🪜 🚪 🪟 🧱 🧲 📡 🪞 🛞 🧯
Sun, space & physics: ☀️ 🌟 ✨ 💫 🌑 🌍 🪐 ☄️ 🔆 🔅 🔥 💥 ⚡ 🌡️ ☢️ 🌈
Garden & life support: 🌱 🌿 🪴 🌳 🌲 🌴 🍀 🌾 🌻 🌼 🌺 🌷 🍄 🫘 🪺 🐝 🦋 🐛 🪱 💧 💦 🚿 🫧 🫁 🧬 🦠 🍃
Coolant & mechanical hazards: 🧊 ❄️ 🥶 💨 🌪️ 🌀 ♨️ 🌊 🫗 🛢️ 🧪 ⚗️ 🧫 🔋 🪫 🔌 💡 🕯️ ⏳ ⏱️ 🚨
Crew & survival: 🧑‍🚀 👩‍🚀 👨‍🚀 👩‍🔬 👨‍🔧 🧑‍🔧 👩‍✈️ 🧑‍🚒 👤 👥 🫀 ❤️ 💔 🩸 🩹 💊 🆘 ⚠️ ☠️ 💀
Navigation, commands & instruments: 🧭 🎯 📍 🗺️ 📐 📏 📊 📈 📉 📟 🖥️ 💻 📱 🎛️ 🎚️ 🔘 🔴 🟢 🟡 🔵 ⏸️ ▶️ 🔄 🔁 🔒 🔓 👁️ 📷 🔭 📻 🔊

## Open design decisions
- Ship silhouette and screen motion (moving ship vs centered ship / growing Sun).
- Exact compartment graph, actor behavior, and coupling rules.
- Which existing shell to inherit, if any.
- Scope and objective of the first playable experiment.

## Working principle
**One film. One game. One deadline.** But for now: **README only, no playable anything.**
