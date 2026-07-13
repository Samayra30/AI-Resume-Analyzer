import React from "react";

const ATSScoreCard = ({ atsScore }) => {
  let scoreColor = "text-red-600";

  if (atsScore >= 80) {
    scoreColor = "text-green-600";
  } else if (atsScore >= 60) {
    scoreColor = "text-yellow-500";
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center">

      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Resume ATS Score
      </h2>

      <div className={`text-7xl font-bold ${scoreColor}`}>
        {atsScore}
      </div>

      <p className="text-gray-500 mt-3">
        Score out of 100
      </p>

      <div className="w-full bg-gray-200 rounded-full h-4 mt-6">

        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-700"
          style={{ width: `${atsScore}%` }}
        ></div>

      </div>

    </div>
  );
};

export default ATSScoreCard;