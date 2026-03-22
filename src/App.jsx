import { lazy, Suspense } from "react";
import Home from "./screens/home/Home";
import MainLayout from "./layout/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import AdminProtectedRoute from "./admin/protectedroute/AdminProtectedRoute";
import { Toaster } from "react-hot-toast";
import RouteLoader from "./components/common/RouteLoader";
import AdminLayout from "./admin/AdminLayout";
import ProjectCardSkeleton from "./components/skeleton/ProjectCardSkeleton";
import AboutSkeleton from "./components/skeleton/AboutSkeleton";
import TimelineExpSkeleton from "./components/skeleton/TimelineExpSkeleton";
const About = lazy(() => import("./screens/about/About"));
const Projects = lazy(() => import("./screens/projects/Projects"));
const Experience = lazy(() => import("./screens/experience/Experience"));
const Contact = lazy(() => import("./screens/contact/Contact"));
const ResumePage = lazy(() => import("./screens/resume/Resume"));

const AdminDashboard = lazy(() => import("./admin/dashboard/AdminDashboard"));
const AdminProjects = lazy(() => import("./admin/projects/AdminProjects"));
const AdminExperience = lazy(() => import("./admin/experience/AdminExperience"));
const AdminResumePage = lazy(() => import("./admin/resume/AdminResumePage"));
const AdminSettingsPage = lazy(() => import("./admin/settings/AdminSettingsPage"));
const AdminAboutPageSingleAPI = lazy(() => import("./admin/about/AdminAbout"));
const AdminLogin = lazy(() => import("./admin/login/AdminLogin"));

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route
                path="about"
                element={
                  <Suspense fallback={<AboutSkeleton />}>
                    <About />
                  </Suspense>
                }
              />
              <Route
                path="projects"
                element={
                  <Suspense fallback={<ProjectCardSkeleton />}>
                    <Projects />
                  </Suspense>
                }
              />
              <Route
                path="experience"
                element={
                  <Suspense fallback={<TimelineExpSkeleton />}>
                    <Experience />
                  </Suspense>
                }
              />
              <Route
                path="contact"
                element={
                  <Suspense fallback={<RouteLoader label="Loading Contact..." />}>
                    <Contact />
                  </Suspense>
                }
              />
              <Route
                path="resume"
                element={
                  <Suspense fallback={<RouteLoader label="Loading Resume..." />}>
                    <ResumePage />
                  </Suspense>
                }
              />
            </Route>

            <Route
              path="/admin/login"
              element={
                <Suspense fallback={<RouteLoader label="Loading Admin Login..." />}>
                  <AdminLogin />
                </Suspense>
              }
            />

            <Route
              path="/admin/*"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route
                index
                element={
                  <Suspense fallback={<RouteLoader label="Loading Dashboard..." />}>
                    <AdminDashboard />
                  </Suspense>
                }
              />
              <Route
                path="projects"
                element={
                  <Suspense fallback={<RouteLoader label="Loading Projects..." />}>
                    <AdminProjects />
                  </Suspense>
                }
              />
              <Route
                path="experience"
                element={
                  <Suspense fallback={<RouteLoader label="Loading Experience..." />}>
                    <AdminExperience />
                  </Suspense>
                }
              />
              <Route
                path="resume"
                element={
                  <Suspense fallback={<RouteLoader label="Loading Resume..." />}>
                    <AdminResumePage />
                  </Suspense>
                }
              />
              <Route
                path="settings"
                element={
                  <Suspense fallback={<RouteLoader label="Loading Settings..." />}>
                    <AdminSettingsPage />
                  </Suspense>
                }
              />
              <Route
                path="about"
                element={
                  <Suspense fallback={<RouteLoader label="Loading About..." />}>
                    <AdminAboutPageSingleAPI />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<RouteLoader label="Loading Dashboard..." />}>
                    <AdminDashboard />
                  </Suspense>
                }
              />
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
