import React, { useState, useRef } from "react";
import ProjectsSidebar from "../../components/ProjectsSidebar/ProjectsSidebar";
import ProjectTabs from "../../components/ProjectTabs/ProjectTabs";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ScrollIndicator from "../../components/ScrollIndicator/ScrollIndicator";
import styles from "./Projects.module.css";

const sampleProjects = [
  {
    id: 1,
    title: "Project 1",
    subtitle: "_ui-animations",
    accentColor: "#615FFF",
    technologies: ["react", "typescript"],
    description:
      "A React-based UI animation library with smooth transitions and micro-interactions.",
  },
  {
    id: 2,
    title: "Project 2",
    subtitle: "_task-manager",
    accentColor: "#10B981",
    technologies: ["vue", "node"],
    description:
      "Full-stack task management application with real-time collaboration features.",
  },
  {
    id: 3,
    title: "Project 3",
    subtitle: "_data-visualization",
    accentColor: "#F59E0B",
    technologies: ["react", "typescript", "node"],
    description:
      "Interactive data visualization dashboard using D3.js and React components.",
  },
  {
    id: 4,
    title: "Project 4",
    subtitle: "_e-commerce",
    accentColor: "#EC4899",
    technologies: ["react", "graphql"],
    description:
      "Modern e-commerce platform with payment integration and inventory management.",
  },
  {
    id: 5,
    title: "Project 5",
    subtitle: "_chat-app",
    accentColor: "#8B5CF6",
    technologies: ["vue", "node", "typescript"],
    description:
      "Real-time chat application with WebSocket support and end-to-end encryption.",
  },
  {
    id: 6,
    title: "Project 6",
    subtitle: "_portfolio-v1",
    accentColor: "#06B6D4",
    technologies: ["react"],
    description:
      "First version of my personal portfolio showcasing various projects and skills.",
  },
  {
    id: 7,
    title: "Project 7",
    subtitle: "_api-gateway",
    accentColor: "#F97316",
    technologies: ["node", "graphql"],
    description: "Scalable API gateway with GraphQL federation and caching.",
  },
  {
    id: 8,
    title: "Project 8",
    subtitle: "_dashboard",
    accentColor: "#14B8A6",
    technologies: ["react", "node"],
    description:
      "Admin dashboard with real-time metrics and reporting capabilities.",
  },
  {
    id: 9,
    title: "Project 9",
    subtitle: "_mobile-app",
    accentColor: "#A855F7",
    technologies: ["react", "typescript"],
    description: "Cross-platform mobile application with native performance.",
  },
];

function Projects() {
  const [activeTab, setActiveTab] = useState("React");
  const [selectedTech, setSelectedTech] = useState(["react"]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const gridRef = useRef(null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleTabClose = (tabId) => {
    // Reset filters to only React when closing the tab
    setSelectedTech(["react"]);
  };

  // Toggle technology with React as default (cannot deselect all)
  const handleToggleTechnology = (techId) => {
    setSelectedTech((prev) => {
      const isCurrentlySelected = prev.includes(techId);

      if (isCurrentlySelected) {
        // If trying to deselect React, check if other techs are selected
        if (techId === "react") {
          const otherTechs = prev.filter((t) => t !== "react");
          if (otherTechs.length > 0) {
            // Other techs are selected, so React can be deselected
            return otherTechs;
          }
          // Otherwise, keep React selected (at least one must be selected)
          return prev;
        }
        // For other techs, just remove them
        return prev.filter((t) => t !== techId);
      } else {
        // Adding a new technology
        return [...prev, techId];
      }
    });
  };

  // Filter projects based on selected technologies
  const filteredProjects = sampleProjects.filter((project) => {
    if (selectedTech.length === 0) return false;
    // Show project if it has at least one of the selected technologies
    return project.technologies.some((tech) => selectedTech.includes(tech));
  });

  const handleScroll = () => {
    const grid = gridRef.current;
    if (grid) {
      const scrollHeight = grid.scrollHeight - grid.clientHeight;
      const scrollTop = grid.scrollTop;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>
        <ProjectsSidebar
          selectedTech={selectedTech}
          onToggleTechnology={handleToggleTechnology}
        />
      </div>

      <div className={styles.mainContent}>
        <div className={styles.tabsContainer}>
          <ProjectTabs
            activeTab={activeTab}
            onTabClick={handleTabClick}
            onClose={handleTabClose}
            selectedTech={selectedTech}
          />
        </div>

        <div
          className={`${styles.projectsGrid} ${styles.customScrollbar}`}
          ref={gridRef}
          onScroll={handleScroll}
          style={{ "--scroll-progress": `${scrollProgress}%` }}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                subtitle={project.subtitle}
                accentColor={project.accentColor}
                description={project.description}
                technologies={project.technologies}
              />
            ))
          ) : (
            <div className={styles.noProjects}>
              <p>No projects match the selected filters.</p>
              <p>Try selecting different technologies.</p>
            </div>
          )}
        </div>
      </div>

      <ScrollIndicator containerRef={gridRef} />
    </div>
  );
}

export default Projects;
