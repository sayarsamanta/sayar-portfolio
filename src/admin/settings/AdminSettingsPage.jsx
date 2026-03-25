import { Moon, Sun, Trash2 } from "lucide-react";
import { useCallback, useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useSelector } from "react-redux";
import useResumeHandler from "../../hooks/useResumeHandler";
import useAboutAPI from "../../hooks/useAboutAPI";
import Button from "../../components/common/Button";

export default function AdminSettingsPage() {
  const { mode, setMode } = useContext(ThemeContext);
  const about = useSelector((state) => state.about);
  const { user } = useSelector((state) => state.about);
  const { uploadResume, loading, deleteResume, deleteLoading } = useResumeHandler();
  const { saveAbout } = useAboutAPI();
  const { resume } = about.user || "";

  const [name, setName] = useState("Samanta Sayar");
  const [email, setEmail] = useState("sayarsamanta@gmail.com");
  const [resumeFile, setResumeFile] = useState(null);

  const handleToggleDarkMode = () => setMode(mode === "light" ? "dark" : "light");

  const handleSaveProfile = useCallback(async () => {
    const payload = {
      name: name || "Sayar Samanta",
      email: email || "sayarsamanta@gmail.com",
    };
    if (!name && !email) {
      toast.error("Name and Email both can not be empty!!");
      return;
    }
    await saveAbout(user?.about, "", true, payload);
  }, [name, email, saveAbout]);
  const handleUploadResume = async () => {
    await uploadResume(resumeFile);
  };
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleDeleteResume = async () => {
    await deleteResume();
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6 font-sans">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center sm:text-left">
        Admin Settings
      </h1>

      {/* Profile */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 space-y-5 shadow-sm md:shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold">Profile Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="input-glass w-full"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input-glass w-full"
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSaveProfile} variant="primary" className="w-full sm:w-auto">
            Save Profile
          </Button>
        </div>
      </div>

      {/* Theme */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 space-y-5 shadow-sm md:shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold">Appearance & Theme</h2>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            {mode === "light" ? <Moon size={16} /> : <Sun color="#FBBF24" size={16} />}

            <span className="text-sm sm:text-base font-medium">
              {mode === "light" ? "Dark Mode" : "Light Mode"}
            </span>
          </div>

          <button
            onClick={handleToggleDarkMode}
            className={`relative w-14 h-8 rounded-full transition-all duration-300 shrink-0 ${
              mode === "dark" ? "bg-[var(--primary)]" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                mode === "dark" ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Resume */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 space-y-5 shadow-sm md:shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold">Resume / Portfolio</h2>

        <div className="space-y-4">
          <span className="block truncate text-sm sm:text-base">{resume?.split("/").pop()}</span>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeChange}
            className="
          border border-[var(--border)] p-2 w-full
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-[var(--primary)] file:text-white
          hover:file:bg-[var(--primary)]
          transition-all cursor-pointer
        "
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleUploadResume}
              loading={loading}
              variant="primary"
              loadingText="Uploading Resume..."
              className="w-full sm:w-auto"
            >
              Upload Resume
            </Button>

            <Button
              onClick={handleDeleteResume}
              disabled={deleteLoading}
              variant="delete"
              loadingText="Deleting resume ...."
              loading={deleteLoading}
              icon={<Trash2 size={18} />}
              className="w-full sm:w-auto"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
