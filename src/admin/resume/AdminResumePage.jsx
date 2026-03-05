import { useState, useRef, useContext, useEffect } from "react";
import { Trash2, UploadCloud } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

export default function AdminResumePage() {
  const [resumeFile, setResumeFile] = useState(null); // current uploaded file
  const fileInputRef = useRef(null);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  // Upload handler
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setResumeFile({ file, url });
    } else {
      alert("Please upload a PDF file.");
    }
  };

  // Delete handler
  const handleDelete = () => {
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <div className="p-8 space-y-6 font-sans">
      <h1 className="text-2xl font-semibold">Admin Resume</h1>

      {/* Upload Section */}
      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleUpload}
          className="hidden"
          id="resume-upload"
        />
        <label
          htmlFor="resume-upload"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
        >
          <UploadCloud size={18} /> Upload Resume
        </label>

        {resumeFile && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            <Trash2 size={16} /> Delete
          </button>
        )}
      </div>

      {/* Preview */}
      {resumeFile && (
        <div className="mt-6 w-full h-[500px] border border-[var(--border)] rounded overflow-hidden">
          <iframe
            src={resumeFile.url}
            title="Resume Preview"
            className="w-full h-full"
          ></iframe>
        </div>
      )}
    </div>
  );
}
