import React, { useState } from 'react';
import {
  RiReactjsFill,
  RiVuejsFill,
  RiNodejsFill,
  RiGlobalFill,
} from 'react-icons/ri';
import { SiTypescript } from 'react-icons/si';
import styles from './ProjectsSidebar.module.css';

const technologies = [
  { id: 'react', name: 'React', icon: RiReactjsFill, color: '#62748E' },
  { id: 'vue', name: 'Vue', icon: RiVuejsFill, color: '62748E' },
  { id: 'typescript', name: 'TypeScript', icon: SiTypescript, color: '#62748E' },
  { id: 'node', name: 'Node.js', icon: RiNodejsFill, color: '#62748E' },
  { id: 'graphql', name: 'GraphQL', icon: RiGlobalFill, color: '#62748E' },
];

function CustomCheckbox({ checked, onChange, label, icon: Icon, color }) {
  return (
    <label className={styles.checkboxLabel}>
      <div className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={styles.hiddenInput}
        />
        <div
          className={`${styles.customCheckbox} ${
            checked ? styles.checked : ''
          }`}
        >
          {checked && (
            <svg
              className={styles.checkmark}
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>

      {Icon && (
        <Icon
          size={20}
          color={color}
          className={styles.checkboxIcon}
        />
      )}

      <span className={styles.checkboxText}>{label}</span>
    </label>
  );
}

function ProjectsSidebar() {
  const [selectedTech, setSelectedTech] = useState(['react']);
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleTechnology = (id) => {
    setSelectedTech((prev) =>
      prev.includes(id)
        ? prev.filter((t) => t !== id)
        : [...prev, id]
    );
  };

  const ArrowDown = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{
        transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
        transition: 'transform 0.2s ease',
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  return (
    <aside className={styles.sidebar}>
      <div
        className={styles.projectsHeader}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <ArrowDown />
        <span>projects</span>
      </div>

      {isExpanded && (
        <div className={styles.techList}>
          {technologies.map((tech) => (
            <CustomCheckbox
              key={tech.id}
              checked={selectedTech.includes(tech.id)}
              onChange={() => toggleTechnology(tech.id)}
              label={tech.name}
              icon={tech.icon}
              color={tech.color}
            />
          ))}
        </div>
      )}
    </aside>
  );
}

export default ProjectsSidebar;