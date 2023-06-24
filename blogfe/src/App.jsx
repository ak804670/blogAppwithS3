
import Navbar from "./components/Navbar"
import './App.css';
import Home from "./components/Home";
import CreateBlog from "./components/CreateBlog"
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<CreateBlog/>}/>
      </Routes>
 
      </BrowserRouter>
      </div>
  );
}

export default App;