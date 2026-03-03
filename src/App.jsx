import About from "./screens/about/About";
import Home from "./screens/home/Home";
import MainLayout from "./layout/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Projects from "./screens/projects/Projects";
import Experience from "./screens/experience/Experience";
import Contact from "./screens/contact/Contact";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import ResumePage from "./screens/resume/Resume";
import AdminLayout from "./admin/AdminLayout";
import { useContext } from "react";
import AdminDashboard from "./admin/dashboard/AdminDashboard";
import AdminProjects from "./admin/projects/AdminProjects";
import AdminExperience from "./admin/experience/AdminExperience";
import AdminSkillPage from "./admin/skill/AdminSkillPage";
import AdminResumePage from "./admin/resume/AdminResumePage";
import AdminSettingsPage from "./admin/settings/AdminSettingsPage";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <main
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
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route
                path="/admin/admindashboard"
                element={<AdminDashboard />}
              />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/experience" element={<AdminExperience />} />
              <Route path="/admin/skills" element={<AdminSkillPage />} />
              <Route path="/admin/resume" element={<AdminResumePage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
              <Route path="*" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
