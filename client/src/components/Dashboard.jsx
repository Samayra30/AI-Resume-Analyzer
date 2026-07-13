import React, { useState } from "react";
import api from "../api/axios";
import FileUpload from "./FileUpload";
import ATSScoreCard from "./ATSScoreCard";
import AnalysisSection from "./AnalysisSection";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleUpload = async () => {
    console.log("Analyze button clicked");

    if (!file) {
      alert("Please select a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await api.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);

      setAnalysis(res.data.analysis);

      alert("Resume analyzed successfully!");

      setFile(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="flex justify-center">

        <FileUpload
          file={file}
          setFile={setFile}
          loading={loading}
          handleUpload={handleUpload}
        />

      </div>

      {analysis && (
        <div className="max-w-5xl mx-auto mt-10 space-y-8">

          <ATSScoreCard atsScore={analysis.atsScore} />

          <AnalysisSection
            title="Strengths"
            color="green"
            icon="✅"
            items={analysis.strengths}
          />

          <AnalysisSection
            title="Weaknesses"
            color="red"
            icon="❌"
            items={analysis.weaknesses}
          />

          <AnalysisSection
            title="Missing Skills"
            color="yellow"
            icon="⚡"
            items={analysis.missingSkills}
          />

          <AnalysisSection
            title="Suggestions"
            color="blue"
            icon="💡"
            items={analysis.suggestions}
          />

        </div>
      )}

    </div>
  );
};

export default Dashboard;