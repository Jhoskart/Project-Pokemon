import './App.css';
import React from 'react'
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home/Home.jsx"
import LandingPage from "./components/LandingPage/landingPage"
import PokeDetail from './components/PokeDetail/PokeDetail';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/create" element={<CreatePokemon />} />
      <Route exacth path="/home/:id" element={<PokeDetail />} />
      </Routes>
    </div>
  );
}

export default App;
