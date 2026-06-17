import React, { createContext, useState, useEffect, useContext } from "react";

const CharactersContext = createContext();

export function CharactersProvider({ children }) {
  const [characterList, setCharacterList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPeopleData = async () => {
    setError(false);
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch("https://swapi.info/api/people");
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      setCharacterList(result);
    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeopleData();
  }, []);

  return (
    <CharactersContext.Provider
      value={{
        characterList,
        searchTerm,
        setSearchTerm,
        currentIndex,
        setCurrentIndex,
        loading,
        error,
        fetchPeopleData,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
}

export function useCharacters() {
  return useContext(CharactersContext);
}
