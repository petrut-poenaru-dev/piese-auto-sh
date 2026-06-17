# Design System Document: Precision Engineering for PieseAutoAga

## 1. Overview & Creative North Star
### The Creative North Star: "The Exploded View"
Inspired by high-end automotive engineering diagrams and the luxury digital showrooms of BMW and Mercedes-Benz, this design system is built upon the concept of **"The Exploded View."** Just as a vehicle is a masterclass in precision-fit components, this UI treats every element as an engineered part. 

We move beyond the "template" look by utilizing **intentional asymmetry** and **tonal layering**. Elements should feel as though they are suspended in a high-tech clean room—floating with precision, separated by light and air rather than rigid lines. This creates an editorial, premium experience that signals authority and technical expertise in the automotive parts industry.

---

## 2. Colors & Surface Logic

This system utilizes a monochromatic base punctuated by "Tech-Tertiary" accents to guide the user's eye to high-value actions.

### The Palette
- **Background (`#f9f9fb`):** The "Clean Room." A sterile, expansive canvas.
- **Primary (`#5e5e5e`):** The "Machined Steel." Used for secondary text and structural weight.
- **On-Surface (`#2d3338`):** The "Tire Black." High-contrast for maximum legibility.
- **Tertiary (`#006c5b`):** The "System Pulse." A subtle tech-teal/green used exclusively for highlights and success states.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Boundaries must be defined through background color shifts. 
- Use `surface-container-low` (`#f2f4f6`) to denote a sidebar or secondary content area against the `surface` background.
- This creates a seamless, "molded" look reminiscent of a luxury car dashboard.

### The "Glass & Gradient" Rule
Floating elements (modals, dropdowns, sticky navs) should utilize **Glassmorphism**.
- **Token:** `surface_container_lowest` (`#ffffff`) at 80% opacity with a `24px` backdrop blur.
- **Signature Textures:** Apply a subtle linear gradient from `primary` (`#5e5e5e`) to `primary_dim` (`#525252`) on main CTAs to mimic the sheen of brushed aluminum.

---

## 3. Typography
The typography system uses a dual-font approach to balance technical precision with editorial elegance.

*   **Display & Headlines:** `Manrope`. A geometric sans-serif that feels engineered yet modern.
    *   **Headline-LG (`2rem`):** Tight letter-spacing (-2%) for an authoritative, "bold-face" automotive look.
*   **Body & Labels:** `Inter`. Optimized for readability in technical specs and parts lists.
*   **Visual Hierarchy:** Use `label-sm` (`0.6875rem`) in all-caps with `0.1rem` tracking for technical metadata (e.g., VIN numbers, SKU codes) to evoke the feel of engraved serial numbers.

---

## 4. Elevation & Depth
Depth in this system is a result of "Tonal Layering"—mimicking the way light hits physical car parts.

### The Layering Principle
Instead of shadows, stack surface tiers to create hierarchy:
1.  **Level 0 (Base):** `surface` (`#f9f9fb`)
2.  **Level 1 (Sections):** `surface-container-low` (`#f2f4f6`)
3.  **Level 2 (Cards):** `surface-container-lowest` (`#ffffff`)

### Ambient Shadows
When an element must "float" (e.g., a selected car part card):
- **Shadow Color:** A 6% opacity tint of `on_surface` (`#2d3338`).
- **Blur:** `32px` to `64px` for an ultra-diffused, ambient light effect.
- **The Ghost Border:** If a boundary is needed for accessibility, use `outline_variant` (`#acb3b8`) at 15% opacity. **Never use 100% opaque outlines.**

---

## 5. Components

### Buttons
- **Primary:** Gradient from `primary` to `primary_dim`. `md` (`0.375rem`) roundedness. White text.
- **Secondary:** `surface_container_high` background with `on_surface` text. No border.
- **State Change:** On hover, primary buttons should shift +5% in brightness; secondary buttons should adopt a `0.5px` Ghost Border.

### The "Exploded" Card
- **Structure:** No dividers. Use `spacing-6` (`2rem`) of vertical whitespace to separate header from content.
- **Interactions:** On hover, the card should scale to `1.02` and transition its background from `surface_container_lowest` to a subtle gradient.
- **Imagery:** Car parts should be displayed as "floating" PNGs with ambient shadows, as if suspended in air.

### Input Fields
- **Default State:** `surface_container_highest` background. No border.
- **Active State:** A bottom-only `2px` stroke of `tertiary` (`#006c5b`) to signal the "system pulse."
- **Typography:** Placeholder text in `on_surface_variant` at 50% opacity.

---

## 6. Do's and Don'ts

### Do:
- **Use Asymmetry:** Place high-quality car imagery partially off-grid to create a sense of forward motion.
- **Respect White Space:** Treat the `spacing-16` (`5.5rem`) token as your best friend for top-level section margins.
- **Use "Tech" Accents:** Reserve `tertiary` for small, meaningful details—an icon, a price, or a status indicator.

### Don't:
- **No Dividers:** Never use a horizontal line to separate list items. Use the `surface_container` hierarchy or spacing instead.
- **No Harsh Shadows:** Avoid the "Material Design" standard shadow. If it looks like a drop-shadow, it’s too heavy. It should look like a "glow" of darkness.
- **No Generic Icons:** Avoid thick, rounded icons. Use thin-stroke (`1px` or `1.5px`), sharp-cornered automotive iconography.

### Contextual Component Suggestion: The "Part-Spec" Chip
For an automotive parts app, create technical chips using `surface_container_low` with `label-sm` text. Use these to denote "OEM Quality," "In Stock," or "German Engineered." These should be flat, with no shadow, to keep the interface feeling like a high-end technical document.