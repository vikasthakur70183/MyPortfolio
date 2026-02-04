import React, { useEffect, useState, useRef } from "react";
import styles from "./ScrollIndicator.module.css";

function ScrollIndicator({ containerRef }) {
  const [progress, setProgress] = useState(0);
  const localContainerRef = useRef(null);

  useEffect(() => {
    // Use provided containerRef or fall back to local ref
    const targetContainer = containerRef?.current || localContainerRef.current;

    const calculateScrollProgress = () => {
      let scrollPercent = 0;

      if (targetContainer) {
        // Container scrolling
        const { scrollTop, scrollHeight, clientHeight } = targetContainer;
        const scrollableHeight = scrollHeight - clientHeight;

        if (scrollableHeight > 0) {
          scrollPercent = (scrollTop / scrollableHeight) * 100;
        }
      } else {
        // Window scrolling
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;

        if (docHeight > 0) {
          scrollPercent = (scrollTop / docHeight) * 100;
        }
      }

      // Clamp between 0 and 100
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    // Initial calculation
    calculateScrollProgress();

    // Set up event listener based on target
    if (targetContainer) {
      targetContainer.addEventListener("scroll", calculateScrollProgress);

      // Also listen for resize since container dimensions may change
      window.addEventListener("resize", calculateScrollProgress);

      return () => {
        targetContainer.removeEventListener("scroll", calculateScrollProgress);
        window.removeEventListener("resize", calculateScrollProgress);
      };
    } else {
      // Window scrolling
      window.addEventListener("scroll", calculateScrollProgress);
      window.addEventListener("resize", calculateScrollProgress);

      return () => {
        window.removeEventListener("scroll", calculateScrollProgress);
        window.removeEventListener("resize", calculateScrollProgress);
      };
    }
  }, [containerRef]);

  return (
    <div className={styles.container} ref={localContainerRef}>
      <div className={styles.track}>
        <div className={styles.thumb} style={{ height: `${progress}%` }} />
      </div>
    </div>
  );
}

export default ScrollIndicator;
