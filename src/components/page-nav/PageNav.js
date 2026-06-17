import React from "react";

import { useCharacters } from "../../Contexts/CharactersContext";

function PageNav({ totalMatches }) {
  const { currentIndex, setCurrentIndex } = useCharacters();
  const nextIndex = currentIndex + 10;

  const nextPage = () => {
    if (currentIndex < totalMatches) setCurrentIndex((x) => x + 10);
  };

  const prevPage = () => {
    if (currentIndex > 0) setCurrentIndex((x) => x - 10);
  };

  return (
    <div className="nav-buttons">
      <button onClick={prevPage} disabled={currentIndex === 0}>
        Previous
      </button>
      <span>Page {currentIndex / 10 + 1}</span>
      <button onClick={nextPage} disabled={nextIndex >= totalMatches}>
        Next
      </button>
    </div>
  );
}

export default PageNav;
