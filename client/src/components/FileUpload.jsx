import React from "react";

const FileUpload = ({
  file,
  setFile,
  loading,
  handleUpload,
}) => {
  return (
    <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">

      <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
        Upload Resume
      </h1>

      <p className="text-center text-gray-500 mb-8">
        Upload your resume for AI analysis
      </p>

      <label className="block w-full border-2 border-dashed border-blue-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">

        <input
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="text-5xl mb-3">📄</div>

        <p className="text-gray-700 font-medium">
          Click here to choose your resume
        </p>

        <p className="text-sm text-gray-400 mt-1">
          PDF only
        </p>

      </label>

      {file && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4 border">

          <h2 className="font-semibold mb-3">
            Selected Resume
          </h2>

          <p>
            <strong>Name:</strong> {file.name}
          </p>

          <p>
            <strong>Size:</strong>{" "}
            {(file.size / 1024).toFixed(2)} KB
          </p>

          <p>
            <strong>Type:</strong> {file.type}
          </p>

        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`mt-6 w-full py-3 rounded-lg text-white font-semibold ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Analyzing Resume..." : "Analyze Resume"}
      </button>

    </div>
  );
};

export default FileUpload;