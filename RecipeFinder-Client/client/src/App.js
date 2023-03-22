import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './app/login/Login';
import Home from './app/home/Home';
import Discover from './app/discover/Discover';
import MenuPlanner from './app/menuPlanner/MenuPlanner';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/home" exact element={<Home />} />
      <Route path="/discover" exact element={<Discover />} />
      <Route path="/menu-planner" exact element={<MenuPlanner />} />
    </Routes>
  );
}

export default App;
