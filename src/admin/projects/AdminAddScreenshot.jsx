import { Plus } from "lucide-react";
import React from "react";
import { Section } from "../../components/admin/projects/Section";

const AdminAddScreenshot = ({
  form,
  handleScreenshotUpload,
  errors,
  rawFiles,
  setRawFiles,
  setForm,
}) => {
  return (
    <Section title="Screenshots">
      <div className="flex items-center justify-between mb-4">
        {/* The actual input is hidden */}
        <input
          type="file"
          multiple
          id="screenshot-upload"
          className="hidden"
          onChange={handleScreenshotUpload}
          error={errors?.screenshots} // Added
        />

        {/* The Label acts as the visible button */}
        <label
          htmlFor="screenshot-upload"
          className="
        cursor-pointer 
        inline-flex items-center gap-2
        px-5 py-2.5 
        bg-primary/10 text-primary 
        border border-primary/20 
        rounded-xl text-sm font-semibold
        transition-all duration-200
        hover:bg-primary hover:text-white 
        hover:shadow-lg hover:shadow-primary/20
        active:scale-95
      "
        >
          <Plus size={16} />
          Choose Project Images
        </label>

        {rawFiles?.length > 0 && (
          <button
            onClick={() => {
              setRawFiles([]);
              setForm({ ...form, screenshots: [] });
            }}
            className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
          >
            Clear Selection ({rawFiles.length})
          </button>
        )}
      </div>

      {/* Preview Grid with a "Empty State" placeholder */}
      {form?.screenshots?.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {form.screenshots.map((src, i) => (
            <div
              key={i}
              className="aspect-video rounded-lg overflow-hidden border border-white/10 relative group bg-black/20"
            >
              <img
                src={"url" in src ? src?.url : src}
                alt="preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                  Preview
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed border-white/5 rounded-2xl h-32 flex flex-col items-center justify-center text-white/20">
          <p className="text-xs">No images selected yet</p>
        </div>
      )}
    </Section>
  );
};

export default AdminAddScreenshot;
