import React from "react";
import styles from "./ProjectTabs.module.css";

const CloseIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Map tech IDs to display names
const techNames = {
  react: "React",
  vue: "Vue",
  typescript: "TypeScript",
  node: "Node",
  graphql: "GraphQL",
};

function ProjectTabs({
  activeTab = "React",
  onClose,
  onTabClick,
  selectedTech = [],
}) {
  // Create combined display text from selected technologies
  const combinedTabText = selectedTech
    .map((techId) => techNames[techId] || techId)
    .join(": ");

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {selectedTech.length > 0 ? (
          <div
            className={`${styles.tab} ${activeTab === "React" ? styles.active : ""}`}
            onClick={() => onTabClick && onTabClick("React")}
          >
            <span className={styles.tabIcon}>⚛</span>
            <span className={styles.tabLabel}>{combinedTabText}</span>
            <button
              className={styles.closeButton}
              onClick={(e) => {
                e.stopPropagation();
                onClose && onClose("React");
              }}
              aria-label="Close tab"
            >
              <CloseIcon />
            </button>
          </div>
        ) : (
          <div className={`${styles.tab} ${styles.active}`}>
            <span className={styles.tabLabel}>No projects selected</span>
          </div>
        )}
        {/* Empty tabs to extend the bar horizontally
        <div className={styles.emptyTab} />
        <div className={styles.emptyTab} />
        <div className={styles.emptyTab} /> */}
      </div>
    </div>
  );
}

export default ProjectTabs;
