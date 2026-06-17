import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

function CharacterView() {
    const [homeWorld, setHomeWorld] = useState("");
    const [films, setFilms] = useState([]);
    const [loadingFilm, setLoadingFilm] = useState(true);
    const [loadingPlanet, setLoadingPlanet] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const character = location.state;

    useEffect(() => {
        if (!character) return;
        const fetchFilms = async () => {
            try {
                setLoadingFilm(true);
        
                const filmPromises = character.films.map(async (filmUrl) => {
                    const response = await fetch(filmUrl);
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    const result = await response.json();
                    return result.title;
                });

                const results = await Promise.allSettled(filmPromises);
                
                // Check if all films failed to load
                if (results.every(r => r.status === "rejected")) throw new Error("Network response was not ok");

                const loadedFilms = results.map(res => 
                    res.status === "fulfilled" ? res.value : "Unable to Load Film"
                );

                console.log(loadedFilms);   

                setFilms(loadedFilms);
            } catch (error) {
                console.log(error);
                setFilms(["The force is not strong with this one. Unable to load films"]);
            } finally {
                setLoadingFilm(false);
            }
        };

        const fetchHomeWorld = async () => {
            setLoadingPlanet(true);
            try {
                const response = await fetch(character.homeworld);
                const result = await response.json();
                setHomeWorld(result.name);
                setLoadingPlanet(false);
            } catch (error) {
                console.log(error);
                setHomeWorld("The force is not strong with this one, unable to load homeworld");
                setLoadingPlanet(false);
            }
        };

        fetchFilms();
        fetchHomeWorld();
    }, [character]);

    if (!character) { 
        return (
            <div>
                <h3>Character Data Unavailable</h3>
                <p>Unable to load character. Please return to the directory and re-select your character.</p>
                <button onClick={() => navigate("/")}>
                    Return to Character List
                </button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => navigate("/")}>Back to Character List</button>
            <h3>Character: {character.name}</h3>
            <p>Height: {character.height} cm</p>
            <p>Mass: {character.mass} kg</p>
            <p>Hair Color: {character.hair_color}</p>
            <p>Skin Color: {character.skin_color}</p>
            <p>Eye Color: {character.eye_color}</p>
            <p>Birth Year: {character.birth_year}</p>
            <p>Gender: {character.gender}</p>
            <p>Homeworld: {loadingPlanet ? "Loading location..." : homeWorld}</p>
            <p>Films:</p>
            <ul>
                {loadingFilm ? 
                    "Loading films..." 
                : 
                    films.map((film, index) => (
                        <li key={index}>{film}</li>
                    ))}
            </ul>
        </div>
      );
    }

export default CharacterView;
