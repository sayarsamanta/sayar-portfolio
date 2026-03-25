import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { optimizeCloudinaryURL } from "../../utils/helper";

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
  const [loaded, setLoaded] = useState(false);

  const getImageUrl = (img) => {
    if (!img) return "https://placehold.co/800x500?text=No+Image";
    return typeof img === "string" ? img : optimizeCloudinaryURL(img.url);
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
    setLoaded(false);
  }, [JSON.stringify(images)]);

  useEffect(() => {
    setLoaded(false);
  }, [current]);

  // preload next image
  useEffect(() => {
    if (!images.length) return;
    const next = (current + 1) % images.length;
    const image = new Image();
    image.src = getImageUrl(images[next]);
  }, [current, images]);

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
        style={{ background: "var(--gradient-bg)" }}
      >
        <span className="text-xs opacity-40">No Image</span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col overflow-hidden ${height} ${rounded} group shadow-lg transition-all duration-500`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Browser Header */}
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
      <div className="relative flex-1 bg-black/[0.03] p-3">
        <div
          className="absolute inset-3 rounded-xl overflow-hidden shadow-inner"
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={getImageUrl(images[current])}
              alt={`Screenshot ${current + 1}`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: loaded ? 1 : 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onLoad={() => setLoaded(true)}
              className="w-full h-full object-cover object-top"
              drag={window.innerWidth > 768 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -50) nextImage();
                if (info.offset.x > 50) prevImage();
              }}
            />
          </AnimatePresence>

          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-white/5 backdrop-blur-sm" />
          )}
        </div>

        {/* Arrows */}
        {showArrows && images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition duration-300">
            <button
              onClick={prevImage}
              className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition"
            >
              <FaChevronLeft size={11} />
            </button>

            <button
              onClick={nextImage}
              className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition"
            >
              <FaChevronRight size={11} />
            </button>
          </div>
        )}

        {/* Dots */}
        {showDots && images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === i ? "w-6 bg-[var(--primary)]" : "w-2 bg-white/30"
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
