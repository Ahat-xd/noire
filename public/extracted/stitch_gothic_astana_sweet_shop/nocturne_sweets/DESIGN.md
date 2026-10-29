---
name: Nocturne Sweets
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1b1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#e8bcb9'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#303032'
  outline: '#ae8784'
  outline-variant: '#5e3f3c'
  surface-tint: '#ffb3ad'
  primary: '#ffb3ad'
  on-primary: '#68000a'
  primary-container: '#ff5451'
  on-primary-container: '#5c0008'
  inverse-primary: '#c0001d'
  secondary: '#ffb3ae'
  on-secondary: '#68000b'
  secondary-container: '#8f1019'
  on-secondary-container: '#ff9992'
  tertiary: '#f0b8be'
  on-tertiary: '#4a262b'
  tertiary-container: '#b58489'
  on-tertiary-container: '#421f24'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad7'
  primary-fixed-dim: '#ffb3ad'
  on-primary-fixed: '#410004'
  on-primary-fixed-variant: '#930013'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3ae'
  on-secondary-fixed: '#410004'
  on-secondary-fixed-variant: '#8f1019'
  tertiary-fixed: '#ffd9dc'
  tertiary-fixed-dim: '#f0b8be'
  on-tertiary-fixed: '#311117'
  on-tertiary-fixed-variant: '#633c41'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: 0em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: 0em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Montserrat
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.12em
  price-lg:
    fontFamily: Montserrat
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: 0.02em
  price-md:
    fontFamily: Montserrat
    fontSize: 17px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

This design system embodies dark atmospheric luxury confectionery. It merges classical gothic mystique with crisp, hyper-modern haute-patisserie minimalism. The aesthetic evokes the sensory tension of fine dark chocolate, crystallized nightshades, spun obsidian sugar, and velvet-smooth fruit coulis. It feels ritualistic, exclusive, seductive, and intensely appetizing rather than grim or grotesque.

The design language balances high-contrast drama with refined modern precision:
- **Atmosphere:** Deep cavernous voids, pitch-black canvases, and focused theatrical spotlighting that elevates artisanal confections to museum-grade treasures.
- **Tone:** Enigmatic, decadent, and unapologetically bold. It targets epicures, avant-garde gift-givers, and lovers of nocturnal aesthetics in urban Astana.
- **Visual Mechanics:** Sharp structural precision softened by blood-crimson atmospheric glows, whisper-thin tinted borders, and rich macro photography of textures—glossy glazes, dusted cacao, and deep berry syrups.

## Colors

The palette is tuned specifically for pitch-black environments to preserve darkness while making confectionary items glow.

### Palette Architecture
- **Primary Accent (`#FF2A36`):** Vibrant neon crimson. Used strictly for high-priority interactive states, primary actions, cart indicators, and vital callouts.
- **Secondary Accent (`#8A0B16`):** Deep vintage blood red. Used for secondary interactive borders, tags, and textural gradients.
- **Tertiary Accent (`#3F1D22`):** Smoldering dark rose-slate. Reserved for subtle container outlines, selected card borders, and atmospheric divider lines.
- **Base Surfaces:**
  - `Canvas / Background Ground`: `#0B0B0D` (Pitch velvet black)
  - `Elevated Surface 1`: `#121214` (Deep charcoal baseline)
  - `Elevated Surface 2 (Cards / Modules)`: `#18181C` (Layered dark mineral)
  - `Elevated Surface 3 (Flyouts / Dialogs)`: `#202026` (Floating charcoal)
- **Borders & Dividers:** `#2A181C` (Subtle oxblood contour) with optional highlight shifts to `#3F1D22` on focus or hover.
- **Typography:**
  - `Text Primary`: `#FFFFFF` (Stark, luminous contrast)
  - `Text Secondary`: `#A0A0A0` (Warm ash gray for ingredients, provenance, metadata)
  - `Text Tertiary`: `#63636B` (Ghost gray for disabled notes, subtle watermarks, and inactive icons)

## Typography

The typographical system establishes an intentional dichotomy between gothic-editorial romance and surgical modern utility.

- **Headlines (`Playfair Display`):** Carries the theatrical, gothic luxury voice. High-contrast transitional serifs provide dramatic presence for product names, story chaptering, and curated collection headers.
- **Body (`Inter`):** Delivers absolute neutrality and effortless legibility in Cyrillic for ingredient lists, tasting notes, allergen statements, and delivery details.
- **Labels & Prices (`Montserrat`):** Rendered with uppercase styling and expanded tracking to create an architectural, structured contrast against the expressive serif headlines.
- **Currency Representation:** All pricing strings append the Kazakhstani Tenge symbol `₸` directly following a non-breaking space (e.g., `4 800 ₸`, `12 500 ₸`), set uniformly in Montserrat to preserve baseline consistency.

## Layout & Spacing

The layout is disciplined, symmetrical, and cinematic. It treats empty black space as a conscious design material, letting luxury confections stand apart with breathing room.

- **Grid Architecture:** 
  - **Desktop (1200px+):** 12-column grid, `margin: 2.5rem`, `gutter: 1.5rem`. Max width container constrained to `1360px` to maintain intimate editorial proportions.
  - **Tablet (768px - 1199px):** 8-column grid, `margin: 2rem`, `gutter: 1.25rem`.
  - **Mobile (< 768px):** 4-column grid, `margin: 1rem`, `gutter: 0.75rem`.
- **Rhythm & Proportion:** Vertical pacing leverages intentional voids (`space-2xl`) between narrative sections, simulating walking through a moonlit gallery. Compact clusters of product metadata utilize tight pairings (`space-xs` and `space-sm`) to balance expansive photography.

## Elevation & Depth

This system avoids conventional white drop-shadows and gray diffuse blurs. Depth is achieved via **tonal stratification, selective crimson glow, and hairline boundaries**.

1. **Layer Hierarchy:**
   - **Canvas Ground (`#0B0B0D`):** Deepest recess. The backdrop for ambient illumination.
   - **Card & Cell Level (`#18181C`):** Rises slightly from the abyss. Framed by a 1px solid stroke of `#2A181C`.
   - **Floating Panels & Modals (`#202026`):** Positioned with crisp `#3F1D22` perimeter strokes and backed by a deep, dark shadow tinted with crimson: `0px 24px 48px -12px rgba(0, 0, 0, 0.85), 0px 0px 32px 0px rgba(138, 11, 22, 0.12)`.
2. **Atmospheric Luminescence:**
   - Active interactive focal points project a tight, suppressed neon crimson aura (`0px 0px 20px rgba(255, 42, 54, 0.35)`).
   - Card hovers do not lift along the Z-axis with transforms; instead, their borders illuminate from muted oxblood (`#2A181C`) to glowing crimson tint (`#8A0B16`).

## Shapes

The geometric framework is predominantly crisp, razor-sharp, and architectonic, with minimal corner suppression:

- **Soft Radius (`0.25rem` / `4px`):** Applied uniformly to buttons, inputs, badge tags, and product showcase cards to remove harsh digital edges without sacrificing gothic sharpness.
- **Structural Integrity:** Dialogue windows, imagery viewports, and interactive drawers employ disciplined right angles and tight radiuses, reinforcing an austere, apothecary-inspired luxury packaging aesthetic.
- **Circular Elements:** Reserved exclusively for small icon pills, quantity increment steppers, and floating close triggers.

## Components

### Buttons
- **Primary Action (e.g., "В корзину", "Оформить заказ"):** 
  - Background `#FF2A36`, foreground `#FFFFFF`, border none. Font: `Montserrat` 600, uppercase, tracked.
  - Hover: Background `#E50914`, box shadow `0 0 16px rgba(255, 42, 54, 0.4)`.
  - Active: Scale `0.98`, background `#BF0811`.
- **Secondary Action (e.g., "Подробнее", "Состав"):**
  - Background `transparent`, border `1px solid #3F1D22`, foreground `#FFFFFF`.
  - Hover: Border `#FF2A36`, background `rgba(255, 42, 54, 0.05)`.
- **Ghost Action:**
  - Background `transparent`, border `none`, foreground `#A0A0A0`.
  - Hover: Foreground `#FFFFFF`.

### Cards (Product & Tasting Collections)
- Background `#18181C`, border `1px solid #2A181C`, border radius `4px`.
- Media container features a dark vignette gradient overlay at the base (`linear-gradient(to top, #18181C 0%, transparent 60%)`) to seamlessly stitch photography into product data.
- Hover state: Border transitions to `#8A0B16`, subtle ambient background highlight.

### Input Fields & Selectors
- Background `#121214`, border `1px solid #2A181C`, text `#FFFFFF`, placeholder `#63636B`.
- Focus state: Border color `#FF2A36`, outline none, subtle crimson inner glow (`box-shadow: 0 0 0 1px #FF2A36`).
- Label: `label-sm` (`Montserrat`), positioned above the field in ash gray (`#A0A0A0`).

### Checkboxes & Radios
- Size `18px x 18px`. Background `#121214`, border `1px solid #3F1D22`.
- Checked state: Background `#FF2A36`, border `#FF2A36`, crisp white interior icon.

### Chips & Flavor Profile Tags
- Background `rgba(63, 29, 34, 0.3)`, border `1px solid #3F1D22`, border-radius `2px`.
- Typography: `label-sm` in ash gray (`#A0A0A0`) or muted crimson (`#FF2A36` for rare/seasonal notes such as "Трюфель", "Горький Чили", "Лимитировано").

### Confectionery Specific: Intensity & Sweetness Scale
- Custom stepped indicator representing cacao percentage, bitterness, or sweetness.
- Inactive segments: `#202026`.
- Active segments: `#FF2A36` with a faint continuous red gleam.

### Currency & Quantity Counter
- Compact stepper with unified `#121214` background, flanked by 1px oxblood borders. 
- Integrated pricing display always locks to the official Kazakhstani Tenge symbol formatted as `0 000 ₸`.