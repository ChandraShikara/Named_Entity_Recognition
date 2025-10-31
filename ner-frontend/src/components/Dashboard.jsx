import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [text, setText] = useState("");
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setEntities([]);

    try {
      const response = await fetch("http://127.0.0.1:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (data.entities) setEntities(data.entities);
    } catch (error) {
      console.error("Error analyzing text:", error);
    }
    setLoading(false);
  };

  const colorMap = {
    PER: "#3b82f6",
    ORG: "#10b981",
    LOC: "#f59e0b",
    DATE: "#ec4899",
    MISC: "#8b5cf6",
  };

  const entityCounts = entities.reduce((acc, ent) => {
    const type = ent.entity_group;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="input-card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2>Enter Text for Entity Recognition</h2>
        <textarea
          placeholder="Type or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="button-wrapper">
          <button onClick={handleAnalyze} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </motion.div>

      <motion.div
        className="output-card"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2>Recognized Entities</h2>

        {Object.keys(entityCounts).length > 0 && (
          <div className="entity-summary">
            {Object.entries(entityCounts).map(([type, count]) => (
              <span
                key={type}
                className="entity-count"
                style={{ backgroundColor: colorMap[type] || "#94a3b8" }}
              >
                {type}: {count}
              </span>
            ))}
          </div>
        )}

        {entities.length > 0 ? (
          <div className="entity-list">
            {entities.map((ent, idx) => (
              <motion.div
                key={idx}
                className="entity-card"
                style={{ borderColor: colorMap[ent.entity_group] || "#64748b" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <h4>{ent.word}</h4>
                <p
                  className="entity-type"
                  style={{ color: colorMap[ent.entity_group] || "#94a3b8" }}
                >
                  {ent.entity_group}
                </p>
                <p className="entity-score">
                  Confidence: {(ent.score * 100).toFixed(2)}%
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          !loading && <p className="no-entities">No entities yet.</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
