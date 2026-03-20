import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const Resume = ({ pdfUrl, setError }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(900);
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
    const updateWidth = () => {
      const width = Math.min(window.innerWidth * 0.9, 900);
      setPageWidth(width);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
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
      a.download = getFileNameFromCloudinary(pdfUrl);

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error("Error downloading resume");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      {pdfUrl && (
        <div
          style={{
            width: "100%",
            maxWidth: "1000px",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            overflowX: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "1rem",
            }}
          >
            <button
              onClick={downloadPDF}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1rem",
                backgroundColor: "var(--primary)",
                color: "white",
                borderRadius: "6px",
                border: "1px solid var(--primary)",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Download
            </button>
          </div>

          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "2rem",
              }}
            >
              Loading PDF...
            </div>
          )}

          <Document
            file={file}
            options={options}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => {
              console.error(error);
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
                <Page
                  pageNumber={index + 1}
                  width={pageWidth}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </div>
            ))}
          </Document>
        </div>
      )}
    </div>
  );
};

export default Resume;
