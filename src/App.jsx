import About from "./about/About";
import Home from "./home/Home";
import MainLayout from "./layout/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Projects from "./projects/Projects";
import Experience from "./experience/Experience";
import Contact from "./contact/Contact";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="experience" element={<Experience />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
