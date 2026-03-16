import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImageSlider = ({
  images = [],
  autoplay = true,
  interval = 4000,
  showDots = true,
  showArrows = true,
  height = "h-52",
  rounded = "rounded-3xl",
}) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const getImageUrl = (img) => {
    if (!img) return "https://placehold.co/800x500?text=No+Image";
    return typeof img === "string" ? img : img.url;
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    setCurrent(0);
  }, [images]);

  useEffect(() => {
    if (!autoplay || isPaused || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, images.length, autoplay, interval]);

  if (!images?.length) {
    return (
      <div
        className={`w-full ${height} ${rounded} flex items-center justify-center border`}
        style={{
          backgroundColor: "rgba(255,255,255,0.02)",
          borderColor: "var(--border)",
        }}
      >
        <span className="text-xs opacity-40">No Image</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${height} ${rounded} border bg-[var(--card)] group shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]`}
      style={{ borderColor: "var(--border)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Browser Top */}
      <div
        className="h-7 flex items-center px-4 gap-2 border-b"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "rgba(255,255,255,0.02)",
        }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>

        <div className="mx-auto h-3 w-1/3 rounded-full bg-white/5" />
      </div>

      {/* Image Area */}
      <div className="relative h-[calc(100%-32px)] bg-gradient-to-b from-black/[0.03] to-black/[0.06] p-2">
        <div
          className="absolute inset-2 rounded-xl overflow-hidden border shadow-inner"
          style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            borderColor: "var(--border)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={getImageUrl(images[current])}
              alt={`Screenshot ${current + 1}`}
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="w-full h-full object-cover object-top"
            />
          </AnimatePresence>
        </div>

        {/* Arrows */}
        {showArrows && images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={prevImage}
              className="w-8 h-8 rounded-full bg-[rgba(0,0,0,0.28)] hover:bg-[rgba(0,0,0,0.45)] text-white flex items-center justify-center backdrop-blur-md transition border border-white/10"
            >
              <FaChevronLeft size={10} />
            </button>

            <button
              onClick={nextImage}
              className="w-8 h-8 rounded-full bg-[rgba(0,0,0,0.28)] hover:bg-[rgba(0,0,0,0.45)] text-white flex items-center justify-center backdrop-blur-md transition border border-white/10"
            >
              <FaChevronRight size={10} />
            </button>
          </div>
        )}

        {/* Dots */}
        {showDots && images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1 rounded-full bg-[rgba(0,0,0,0.22)] backdrop-blur-md border border-white/5">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === i ? "w-5 bg-[var(--primary)]" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
