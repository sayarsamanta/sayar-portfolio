import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { Document, Page, pdfjs } from "react-pdf";
import { Download } from "lucide-react";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const Resume = ({ pdfUrl, setError }) => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);

  const file = useMemo(() => ({ url: pdfUrl }), [pdfUrl]);

  const options = useMemo(
    () => ({
      cMapUrl: "https://unpkg.com/pdfjs-dist@5.4.296/cmaps/",
      standardFontDataUrl: "https://unpkg.com/pdfjs-dist@5.4.296/standard_fonts/",
    }),
    []
  );

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 360) {
        setScale(0.34);
      } else if (width < 400) {
        setScale(0.38);
      } else if (width < 480) {
        setScale(0.42);
      } else if (width < 640) {
        setScale(0.5);
      } else if (width < 768) {
        setScale(0.58);
      } else if (width < 900) {
        setScale(0.68);
      } else if (width < 1024) {
        setScale(0.78);
      } else if (width < 1280) {
        setScale(0.9);
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const downloadPDF = async () => {
    try {
      const res = await fetch(pdfUrl);
      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error("Error downloading resume");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 lg:px-8">
      <div
        style={{
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          borderRadius: "20px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          padding: "1rem",
        }}
      >
        {/* Top Action Bar */}
        <div className="flex flex-col justify-between items-center gap-4 mb-6">
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            Resume Preview
          </h2>

          <button
            onClick={downloadPDF}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.65rem 1rem",
              background: "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 500,
              boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
              transition: "all 0.25s ease",
            }}
          >
            <Download size={18} />
            Download PDF
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "2rem",
              color: "var(--text-secondary)",
            }}
          >
            Loading Resume...
          </div>
        )}

        {/* PDF Document */}
        <Document
          file={file}
          options={options}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => {
            setError(true);
            setLoading(false);
          }}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div
              key={index}
              style={{
                marginBottom: "2rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.10)",
                  background: "white",
                  maxWidth: "100%",
                }}
              >
                <Page
                  pageNumber={index + 1}
                  width={800}
                  scale={scale}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </div>
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
};

export default Resume;
