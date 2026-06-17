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
    console.log(character);

    
    useEffect(() => {
        const fetchFilms = async () => {
            setLoadingFilm(true);
            try {
                const filmPromises = character.films.map(async (film) => {
                    const response = await fetch(film);
                    const result = await response.json();
                    return result.title;                  
                });

                const loadedFilms = await Promise.all(filmPromises);

                setFilms(loadedFilms);
                setLoadingFilm(false);
            } catch (error) {
                console.log(error);
                setFilms(["The force is not strong with this one, unable to fetch films"]);
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
                setHomeWorld("The force is not strong with this one, unable to fetch homeworld");
                setLoadingPlanet(false);
            }
        };

        fetchFilms();
        fetchHomeWorld();
    }, []);

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
