import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



function CharacterList() {
    const [characterList, setCharacterList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const ViewDetails = (characterInfo) => {
        const characterId = characterInfo.url.split("/").pop();
        navigate(`/character-view/${characterId}`, { state: characterInfo });
    }

    const fetchPeopleData = async () => {
        setError(false);
        setLoading(true);
        try {
            //Adding time for Loading Screen
            await new Promise(resolve => setTimeout(resolve, 2000));

            const response = await fetch('https://swapi.info/api/people');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const result = await response.json();
            setCharacterList(result);
        } catch (error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPeopleData();
    }, []);

    const searchingCharacters = characterList.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const searchCharacters = (event) => {
        setSearchTerm(event.target.value);
        setCurrentIndex(0);
    }

    const nextIndex = currentIndex + 10;

    const currentCharacters = searchingCharacters.slice(currentIndex, nextIndex);

    // Click Functions for changing pages
    const nextPage = () => {
    if (currentIndex < searchingCharacters.length) setCurrentIndex((x) => x + 10);
    };

    const prevPage = () => {
    if (currentIndex > 1) setCurrentIndex((x) => x - 10);
    };

  return (
    <div>
        <h3>Character List:</h3>

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
                        <div className="search-bar">
                            <input 
                                className="input-field" 
                                type="text" 
                                placeholder="Search characters by name..." 
                                onChange={searchCharacters} />
                        </div>
                        <div className="nav-buttons">
                            <button onClick={prevPage} disabled={currentIndex === 0}>
                                Previous
                            </button>
                            <span>Page {(currentIndex/10) + 1}</span>
                            <button onClick={nextPage} disabled={nextIndex >= searchingCharacters.length}>
                                Next
                            </button>
                        </div>

                        {searchingCharacters.length === 0 ? 
                        (
                            <div>No matches found for "{searchTerm}". Try checking your spelling or searching for someone else!</div>
                        ) : (
                            currentCharacters.map((character) => (
                                <button className="character-card" key={character.name} onClick={() => ViewDetails(character)}>
                                    <div className="character-name" >{character.name}</div>
                                    <div className="character-info">
                                        <div>Birth Year: {character.birth_year}</div>
                                        <div>Gender: {character.gender}</div>
                                    </div>
                                </button>
                            ))
                        )}
                    </>
                )}
            </>
        )}

    </div>
  );
}

export default CharacterList;
