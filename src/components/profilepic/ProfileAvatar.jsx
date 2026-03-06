import { useRef } from "react";
import { Camera } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfileAvatar({
  src,
  editable = false,
  onChange,
  size = "large",
}) {
  const fileRef = useRef();

  const sizes = {
    small: "w-12 h-12",
    medium: "w-32 h-32",
    large: "w-44 h-44",
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    if (onChange) {
      onChange({
        file,
        preview,
      });
    }
  };

  return (
    <div className="relative group">
      <motion.img
        src={src}
        alt="Profile"
        className={`
          ${sizes[size]}
          rounded-full
          object-cover
          border-${size==="small"?2:4}
          border-[var(--border)]
          shadow-lg
        `}
        style={{ borderColor: "var(--primary)" }}
        whileHover={{ scale: editable ? 1.03 : 1 }}
      />

      {editable && (
        <>
          {/* Upload Button Overlay */}
          <button
            onClick={() => fileRef.current.click()}
            className="
              absolute
              inset-0
              rounded-full
              flex
              items-center
              justify-center
              bg-black/40
              opacity-0
              group-hover:opacity-100
              transition
            "
          >
            <Camera size={24} className="text-white" />
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      )}
    </div>
  );
}