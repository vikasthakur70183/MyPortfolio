# Task: Refine Header.module.css for Visual Match with Reference Image

## Analysis Summary
- **Header.jsx structure**: header > container > brand + nav + contact
- **Current CSS state**: Has basic dark theme and tab styling but needs refinement
- **Reference image requirements**:
  - Dark futuristic developer portfolio header
  - Rectangular segmented tabs with visible borders
  - Active tab has highlighted underline/accent border
  - Centered content inside bordered container
  - Outer background darker than inner container
  - Subtle glow and soft gradients
  - Clean monospace typography

## CSS Refinements Needed
1. Container: Clean bordered panel design with centered content
2. Brand: Monospace typography with proper spacing
3. Navigation: Boxed tabs with vertical separators between items
4. Active state: Clear bottom accent border with subtle background
5. Contact: Styled as a tab to match nav items
6. Responsiveness: Tablet (tighter spacing) and Mobile (stacked layout)
7. Remove excessive blur/glow - keep subtle and crisp
8. Preserve accessibility (focus-visible, hover states)

## Implementation Steps
- [x] Update CSS custom properties for precise color palette
- [x] Refine container styling for bordered panel appearance
- [x] Style brand section with monospace typography
- [x] Create boxed tab design for navigation items with separators
- [x] Implement active tab highlighting with bottom accent border
- [x] Style contact section as a tab
- [x] Add tablet breakpoint (≤768px) with tighter spacing
- [x] Add mobile breakpoint (≤480px) with stacked layout
- [x] Preserve accessibility and reduced motion preferences
- [x] Add print styles

## Output File
- src/components/Header/Header.module.css (refined)

