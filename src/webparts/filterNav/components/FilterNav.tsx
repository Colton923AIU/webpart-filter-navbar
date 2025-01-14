import * as React from "react";
import styles from "./FilterNav.module.scss";
import type { IFilterNavProps } from "./IFilterNavProps";

const FilterNav: React.FC<IFilterNavProps> = ({ filterNames }) => {
  const [navBarLoaded, setNavBarLoaded] = React.useState(false);

  const loadNavbar = (filterNames: string[], parent: HTMLElement) => {
    filterNames.forEach((filterID) => {
      const trimmedID = filterID.trim();

      const attemptAppend = () => {
        const filterElement = document.getElementById(trimmedID)?.parentElement;

        if (filterElement) {
          parent.appendChild(filterElement);
        }
      };

      // Check initially
      attemptAppend();

      // Use MutationObserver to wait for the element if not immediately found
      const observer = new MutationObserver(() => {
        const filterElement = document.getElementById(trimmedID)?.parentElement;
        if (filterElement) {
          parent.appendChild(filterElement);
          observer.disconnect(); // Stop observing once the element is appended
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  };

  React.useEffect(() => {
    if (navBarLoaded) return;

    const parent = document.getElementById("filter-nav-container");
    if (!parent) {
      console.warn("Parent container for navbar not found");
      return;
    }

    if (!Array.isArray(filterNames) || filterNames.length === 0) {
      console.warn("No valid filter names provided");
      return;
    }

    console.log("Initializing navbar...");
    loadNavbar(filterNames, parent);
    setNavBarLoaded(true);

    return () => {
      // Cleanup logic (if needed)
    };
  }, [navBarLoaded, filterNames]);

  return (
    <div className={styles.filterNavContainer} id="filter-nav-container" />
  );
};

export default FilterNav;
