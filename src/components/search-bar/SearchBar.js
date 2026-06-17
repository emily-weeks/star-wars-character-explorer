import { useCharacters } from "../../Contexts/CharactersContext";

function SearchBar() {
  const { searchTerm, setSearchTerm, setCurrentIndex } = useCharacters();

  const searchCharacters = (event) => {
    setSearchTerm(event.target.value);
    setCurrentIndex(0);
  };

  return (
    <div className="search-bar">
      <input
        className="input-field"
        type="text"
        placeholder="Search characters by name..."
        value={searchTerm}
        onChange={searchCharacters}
      />
    </div>
  );
}

export default SearchBar;
