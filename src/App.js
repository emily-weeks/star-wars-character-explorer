// import React, { useState, useEffect } from "react";

// import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CharacterList from "./components/CharacterList";
import CharacterView from "./components/CharacterView";


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
