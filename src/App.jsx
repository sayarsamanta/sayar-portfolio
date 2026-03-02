import About from "./screens/about/About";
import Home from "./screens/home/Home";
import MainLayout from "./layout/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Projects from "./screens/projects/Projects";
import Experience from "./screens/experience/Experience";
import Contact from "./screens/contact/Contact";
import { ThemeProvider } from "./context/ThemeContext";
import ResumePage from "./screens/resume/Resume";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <main
          className="pt-20"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--text-primary)",
          }}
        >
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="projects" element={<Projects />} />
              <Route path="experience" element={<Experience />} />
              <Route path="contact" element={<Contact />} />
              <Route path="resume" element={<ResumePage />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
