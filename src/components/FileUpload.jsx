import React from 'react';

export default function FileUpload({ onFileUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        accept=".kml,.kmz"
        onChange={handleFileChange}
        id="file-upload"
        style={{ display: 'none' }}
      />
      <label htmlFor="file-upload" className="btn btn-primary">
        📁 Upload KML/KMZ File
      </label>
    </div>
  );
}