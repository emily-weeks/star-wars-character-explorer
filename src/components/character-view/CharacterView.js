import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          const result = await response.json();
          return result.title;
        });

        const results = await Promise.allSettled(filmPromises);

        // Check if all films failed to load
        if (results.every((r) => r.status === "rejected"))
          throw new Error("Network response was not ok");

        const loadedFilms = results.map((res) =>
          res.status === "fulfilled" ? res.value : "Unable to Load Film"
        );

        setFilms(loadedFilms);
      } catch (error) {
        console.log(error);
        setFilms([
          "The force is not strong with this one. Unable to load films",
        ]);
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
        setHomeWorld(
          "The force is not strong with this one, unable to load homeworld"
        );
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
        <p>
          Unable to load character. Please return to the directory and re-select
          your character.
        </p>
        <button onClick={() => navigate("/")}>Return to Character List</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>Back to Character List</button>
      <h2>Character: {character.name}</h2>
      <div className="character-info">
        <div>
          <h5>Height: </h5> {character.height}
        </div>
        <div>
          <h5>Mass: </h5>
          {character.mass}
        </div>
        <div>
          <h5>Hair Color: </h5>
          {character.hair_color}
        </div>
        <div>
          <h5>Skin Color: </h5>
          {character.skin_color}
        </div>
        <div>
          <h5>Eye Color: </h5>
          {character.eye_color}
        </div>
        <div>
          <h5>Birth Year: </h5>
          {character.birth_year}
        </div>
        <div>
          <h5>Gender: </h5> {character.gender}
        </div>
      </div>
      <div className="homeworld-info">
        <h5>Homeworld: </h5>
        {loadingPlanet ? "Loading location..." : homeWorld}
      </div>
      <div className="film-info">
        <h5>Films:</h5>
        <ul>
          {loadingFilm
            ? "Loading films..."
            : films.map((film, index) => <li key={index}>{film}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default CharacterView;
