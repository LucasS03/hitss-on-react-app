import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Lessons from "./pages/LessonsofCourse";
import Header from "./components/header";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Lesson from "./pages/Lesson";

function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Home />} />

        <Route path="/admin/:page" element={<Admin />} />

        <Route path="/curso/:courseId/aulas" element={<Lessons />} />
        <Route path="/curso/:courseId/aula/:lessonId" element={<Lesson />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
