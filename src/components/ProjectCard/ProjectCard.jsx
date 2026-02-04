import React from "react";
import styles from "./ProjectCard.module.css";

const ReactIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="2" fill="white" />
    <g stroke="white" strokeWidth="1" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </g>
  </svg>
);

function ProjectCard({
  title = "Project 1",
  subtitle = "_ui-animations",
  accentColor = "#615FFF",
  image,
  description,
  techBadge = true,
}) {
  return (
    <article className={styles.card}>
      <div className={styles.imageSection}>
        {image ? (
          <img src={image} alt={`${title} preview`} />
        ) : (
          <div
            className={styles.imagePlaceholder}
            style={{ backgroundColor: accentColor }}
          >
            <div className={styles.placeholderText}>
              <span>PROJECT</span>
              <span>PREVIEW</span>
            </div>
          </div>
        )}
        {techBadge && (
          <div className={styles.techBadge}>
            <ReactIcon />
          </div>
        )}
        <div className={styles.gradientOverlay} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>
          <span className={styles.titleAccent}>{title}</span> //{" "}
          <span className={styles.subtitle}>{subtitle}</span>
        </h3>

        {description && <p className={styles.description}>{description}</p>}

        <button className={styles.button}>view-project</button>
      </div>
    </article>
  );
}

export default ProjectCard;
