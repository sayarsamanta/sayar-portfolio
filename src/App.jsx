import About from "./screens/about/About";
import Home from "./screens/home/Home";
import MainLayout from "./layout/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Projects from "./screens/projects/Projects";
import Experience from "./screens/experience/Experience";
import Contact from "./screens/contact/Contact";
import { ThemeProvider } from "./context/ThemeContext";
import ResumePage from "./screens/resume/Resume";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/dashboard/AdminDashboard";
import AdminProjects from "./admin/projects/AdminProjects";
import AdminExperience from "./admin/experience/AdminExperience";
import AdminResumePage from "./admin/resume/AdminResumePage";
import AdminSettingsPage from "./admin/settings/AdminSettingsPage";
import AdminAboutPageSingleAPI from "./admin/about/AdminAbout";
import AdminLogin from "./admin/login/AdminLogin";
import AdminProtectedRoute from "./admin/protectedroute/AdminProtectedRoute";
import { Toaster } from "react-hot-toast";

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
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="admindashboard" element={<AdminDashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="experience" element={<AdminExperience />} />
              <Route path="resume" element={<AdminResumePage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
              <Route path="about" element={<AdminAboutPageSingleAPI />}></Route>
              <Route path="*" element={<AdminDashboard />} />
            </Route>
          </Routes>
          <Toaster
            position="top-right"
            reverseOrder={false}
            containerStyle={{
              
              zIndex: 99999,
            }}
            toastOptions={{
              
              style: {
                zIndex: 99999,
                background: "var(--card)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
              },
            }}
          />
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
