import React from "react";

const colorClasses = {
  green: {
    heading: "text-green-600",
    border: "border-green-500",
    bg: "bg-green-50",
  },

  red: {
    heading: "text-red-600",
    border: "border-red-500",
    bg: "bg-red-50",
  },

  yellow: {
    heading: "text-yellow-600",
    border: "border-yellow-500",
    bg: "bg-yellow-50",
  },

  blue: {
    heading: "text-blue-600",
    border: "border-blue-500",
    bg: "bg-blue-50",
  },
};

const AnalysisSection = ({ title, icon, items, color }) => {
  const styles = colorClasses[color];

  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 border-l-8 ${styles.border}`}
    >
      <h2
        className={`text-2xl font-bold mb-5 flex items-center gap-2 ${styles.heading}`}
      >
        <span>{icon}</span>
        <span>{title}</span>
      </h2>

      <ul className="space-y-4">
        {items.map((item, index) => (
          <li
            key={index}
            className={`p-4 rounded-lg ${styles.bg} text-gray-700 leading-relaxed`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalysisSection;