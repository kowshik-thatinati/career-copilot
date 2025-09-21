import React from "react";

function AddfilesButton({ onFileSelect }) {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // multiple files
    if (files.length > 0 && onFileSelect) {
      onFileSelect(files); // send array to parent
    }
  };

  return (
    <label className="addfiles-button">
      
      {/* File Icon (SVG instead of +) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ cursor: "pointer" }}
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>

      <input
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </label>
  );
}

export default AddfilesButton;
