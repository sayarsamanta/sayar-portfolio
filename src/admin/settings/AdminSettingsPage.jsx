import { useContext, useEffect, useState } from "react";
import { Sun, Moon, LogOut, Key, Trash2, Download } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

export default function AdminSettingsPage() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  // --------- STATES ----------
  const [primaryColor, setPrimaryColor] = useState("#3b82f6"); // Tailwind blue-500
  const [name, setName] = useState("Admin Name");
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const [resumeFileName, setResumeFileName] = useState("Resume.pdf");

  // --------- HANDLERS ----------
  const handleToggleDarkMode = () => setDarkMode(!darkMode);
  const handlePrimaryColorChange = (e) => setPrimaryColor(e.target.value);

  const handleSaveProfile = () => {
    alert("Profile Saved!");
    // integrate API later
  };
  const handleChangePassword = () => {
    alert("Password Changed!");
    setPassword("");
  };
  const handleDownloadResume = () => {
    alert("Downloading Resume...");
    // integrate file download
  };
  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      alert("Account Deleted!");
      // integrate API
    }
  };

  return (
    <div className="p-8 space-y-8 font-sans">
      <h1 className="text-2xl font-semibold">Admin Settings</h1>

      {/* -------- PROFILE SECTION -------- */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="input-glass"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input-glass"
          />
        </div>
        <button
          onClick={handleSaveProfile}
          className="px-4 py-2 bg-[var(--primary)] text-[var(--text-button)] rounded-xl"
        >
          Save Profile
        </button>
      </div>

      {/* -------- APPEARANCE SECTION -------- */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">Appearance & Theme</h2>
        <div className="flex items-center gap-6">
          <button
            onClick={handleToggleDarkMode}
            className="flex items-center gap-2 px-4 py-2 border rounded-xl"
          >
            {darkMode ? <Moon size={16} /> : <Sun size={16} />}
            {darkMode ? "Dark Mode" : "Light Mode"}
          </button>

          <label className="flex items-center gap-2">
            Primary Color:
            <input
              type="color"
              value={primaryColor}
              onChange={handlePrimaryColorChange}
              className="w-10 h-8 border rounded"
            />
          </label>
        </div>
      </div>

      {/* -------- PASSWORD SECTION -------- */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">Security</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="input-glass"
          />
        </div>
        <button
          onClick={handleChangePassword}
          className="px-4 py-2 bg-[var(--primary)] text-[var(--text-button)] rounded-xl flex items-center gap-2"
        >
          <Key size={16} /> Change Password
        </button>
      </div>

      {/* -------- RESUME SECTION -------- */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">Resume / Portfolio</h2>
        <div className="flex items-center gap-4">
          <span>{resumeFileName}</span>
          <button
            onClick={handleDownloadResume}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Download size={16} /> Download
          </button>
        </div>
      </div>

      {/* -------- ACCOUNT ACTIONS -------- */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">Account Actions</h2>
        <button
          onClick={handleDeleteAccount}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          <Trash2 size={16} /> Delete Account
        </button>
        <button
          onClick={() => alert("Logging out...")}
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
}
