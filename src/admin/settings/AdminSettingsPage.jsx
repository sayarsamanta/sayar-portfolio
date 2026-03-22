import { Moon, Sun, Trash2 } from "lucide-react";
import { useCallback, useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useSelector } from "react-redux";
import useResumeHandler from "../../hooks/useResumeHandler";
import useAboutAPI from "../../hooks/useAboutAPI";
import Button from "../../components/common/Button";

export default function AdminSettingsPage() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const about = useSelector((state) => state.about);
  const { user } = useSelector((state) => state.about);
  const { uploadResume, loading, deleteResume, deleteLoading } = useResumeHandler();
  const { saveAbout } = useAboutAPI();
  const { resume } = about.user || "";

  const [name, setName] = useState("Samanta Sayar");
  const [email, setEmail] = useState("sayarsamanta@gmail.com");
  const [resumeFile, setResumeFile] = useState(null);

  const handleToggleDarkMode = () => setDarkMode(!darkMode);

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
      <h1 className="text-xl sm:text-2xl font-semibold">Admin Settings</h1>
      <div className=" border border-[var(--border)] rounded-2xl p-4 sm:p-6 space-y-4">
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
        <Button onClick={handleSaveProfile} variant="primary">
          Save Profile
        </Button>
      </div>
      <div className="border border-[var(--border)] rounded-2xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">Appearance & Theme</h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <button
            onClick={handleToggleDarkMode}
            className="flex items-center justify-center gap-2 px-4 py-2 border rounded-xl w-full sm:w-auto"
          >
            {darkMode ? <Moon size={16} /> : <Sun size={16} />}
            {darkMode ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </div>
      <div className="border border-[var(--border)] rounded-2xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">Resume / Portfolio</h2>

        <div className="flex flex-col gap-4 w-full">
          <span className="truncate text-sm sm:text-base max-w-full">
            {resume?.split("/").pop()}
          </span>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="border border-[var(--border)] p-2 flex-1 min-w-[160px] 
              /* The main input background */
             file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-[var(--primary)] file:text-white
             hover:file:bg-[var(--primary)]
             transition-all cursor-pointer"
            />

            <Button
              onClick={handleUploadResume}
              loading={loading}
              variant="primary"
              loadingText="Uploading Resume..."
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
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
