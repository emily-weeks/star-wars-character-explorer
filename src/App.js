// import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './components/character-list/CharacterList.css';
import './components/character-view/CharacterView.css';

import CharacterList from "./components/character-list/CharacterList";
import CharacterView from "./components/character-view/CharacterView";


function App() {

  return (
    <div className="App">
      <h1>Star Wars Character Explorer</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character-view/:id" element={<CharacterView />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
