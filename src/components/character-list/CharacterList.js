import React from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../search-bar/SearchBar";
import PageNav from "../page-nav/PageNav";

import { useCharacters } from "../../Contexts/CharactersContext";

function CharacterList() {
  const {
    characterList,
    searchTerm,
    currentIndex,
    loading,
    error,
    fetchPeopleData,
  } = useCharacters();

  const navigate = useNavigate();

  const ViewDetails = (characterInfo) => {
    const characterId = characterInfo.url.split("/").pop();
    navigate(`/character-view/${characterId}`, { state: characterInfo });
  };

  const searchingCharacters = characterList.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const nextIndex = currentIndex + 10;
  const currentCharacters = searchingCharacters.slice(currentIndex, nextIndex);

  return (
    <div>
      <h2>Character List:</h2>

      {error ? (
        <>
          <div>Error loading character data. Please try again.</div>
          <button onClick={fetchPeopleData}>Retry</button>
        </>
      ) : (
        <>
          {loading ? (
            <div>Loading Star Wars characters...</div>
          ) : (
            <>
              <SearchBar />
              <PageNav totalMatches={searchingCharacters.length} />

              {searchingCharacters.length < characterList.length ? (
                <h4>
                  {searchingCharacters.length} matches found for "{searchTerm}"
                </h4>
              ) : searchingCharacters.length === 0 ? (
                <h4>
                  No matches found for "{searchTerm}". Try checking your
                  spelling or searching for someone else!
                </h4>
              ) : (
                <h4>{searchingCharacters.length} Characters</h4>
              )}

              <div className="card-grid">
                {currentCharacters.map((character) => (
                  <button
                    className="character-card"
                    key={character.name}
                    onClick={() => ViewDetails(character)}
                  >
                    <h3 className="character-name">{character.name}</h3>
                    <div className="character-basic-info">
                      <div>Birth Year: {character.birth_year}</div>
                      <div>Gender: {character.gender}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default CharacterList;
