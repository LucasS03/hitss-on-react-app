import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Lessons from "./pages/LessonsofCourse";
import Header from "./components/header";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio/:id" element={<Home />} />

        <Route path="/admin/:page" element={<Admin />} />

        <Route path="/curso/:courseId/lessons/" element={<Lessons />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
