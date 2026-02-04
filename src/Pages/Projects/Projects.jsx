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
    description:
      "A React-based UI animation library with smooth transitions and micro-interactions.",
  },
  {
    id: 2,
    title: "Project 2",
    subtitle: "_task-manager",
    accentColor: "#10B981",
    description:
      "Full-stack task management application with real-time collaboration features.",
  },
  {
    id: 3,
    title: "Project 3",
    subtitle: "_data-visualization",
    accentColor: "#F59E0B",
    description:
      "Interactive data visualization dashboard using D3.js and React components.",
  },
  {
    id: 4,
    title: "Project 4",
    subtitle: "_e-commerce",
    accentColor: "#EC4899",
    description:
      "Modern e-commerce platform with payment integration and inventory management.",
  },
  {
    id: 5,
    title: "Project 5",
    subtitle: "_chat-app",
    accentColor: "#8B5CF6",
    description:
      "Real-time chat application with WebSocket support and end-to-end encryption.",
  },
  {
    id: 6,
    title: "Project 6",
    subtitle: "_portfolio-v1",
    accentColor: "#06B6D4",
    description:
      "First version of my personal portfolio showcasing various projects and skills.",
  },
  {
    id: 7,
    title: "Project 4",
    subtitle: "_e-commerce",
    accentColor: "#EC4899",
    description:
      "Modern e-commerce platform with payment integration and inventory management.",
  },
  {
    id: 8,
    title: "Project 5",
    subtitle: "_chat-app",
    accentColor: "#8B5CF6",
    description:
      "Real-time chat application with WebSocket support and end-to-end encryption.",
  },
  {
    id: 9,
    title: "Project 6",
    subtitle: "_portfolio-v1",
    accentColor: "#06B6D4",
    description:
      "First version of my personal portfolio showcasing various projects and skills.",
  },
];

function Projects() {
  const [activeTab, setActiveTab] = useState("React");
  const [scrollProgress, setScrollProgress] = useState(0);
  const gridRef = useRef(null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleTabClose = (tabId) => {
    console.log("Close tab:", tabId);
  };

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
        <ProjectsSidebar />
      </div>

      <div className={styles.mainContent}>
        <div className={styles.tabsContainer}>
          <ProjectTabs
            activeTab={activeTab}
            onTabClick={handleTabClick}
            onClose={handleTabClose}
          />
        </div>

        <div
          className={`${styles.projectsGrid} ${styles.customScrollbar}`}
          ref={gridRef}
          onScroll={handleScroll}
          style={{ "--scroll-progress": `${scrollProgress}%` }}
        >
          {sampleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              subtitle={project.subtitle}
              accentColor={project.accentColor}
              description={project.description}
            />
          ))}
        </div>
      </div>

      <ScrollIndicator containerRef={gridRef} />
    </div>
  );
}

export default Projects;
