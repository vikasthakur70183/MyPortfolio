# TODO: Show Selected Technologies in Single Tab

## Overview

Display selected technologies from ProjectsSidebar in a single tab format like "React: TypeScript: Node" in the ProjectTabs component and filter projects accordingly.

## Tasks

### 1. Update Projects.jsx

- [x] Lift `selectedTech` state from ProjectsSidebar to Projects.jsx
- [x] Pass `selectedTech` and `setSelectedTech` props to ProjectsSidebar
- [x] Pass `selectedTech` prop to ProjectTabs
- [x] Add `technologies` array to sample projects data
- [x] Add filtering logic to filter projects by selected technologies
- [x] Display filtered projects in the grid
- [x] Show "No projects match" message when filters exclude all projects

### 2. Update ProjectsSidebar.jsx

- [x] Accept `selectedTech` and `setSelectedTech` as props
- [x] Remove internal `selectedTech` state
- [x] Keep `isExpanded` state local

### 3. Update ProjectTabs.jsx

- [x] Accept `selectedTech` prop
- [x] Remove hardcoded tabs array
- [x] Create combined tab display showing all selected technologies

### 4. Update ProjectTabs.module.css

- [x] Update styles for the combined tab format
- [x] Handle long technology names gracefully with text-overflow ellipsis

### 5. Update Projects.module.css

- [x] Add styles for "no projects" empty state message

## Completion Criteria

- [x] Selected technologies appear in a single tab
- [x] Tab format shows names separated by ":"
- [x] Clicking sidebar checkboxes updates the tab
- [x] Projects are filtered based on selected technologies
- [x] Projects match if they have at least one selected technology
- [x] UI is responsive and visually consistent
- [x] Empty state message shown when no projects match
