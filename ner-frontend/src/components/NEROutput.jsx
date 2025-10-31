import React from "react";
import "./NEROutput.css";

const NEROutput = ({ entities }) => {
  if (!entities || entities.length === 0) return null;

  // Count entities by type
  const entityCounts = entities.reduce((acc, ent) => {
    const type = ent.entity_group || "UNKNOWN";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="output-card">
      <h2>Recognized Entities</h2>

      {/* Entity Count Summary */}
      <div className="entity-summary">
        {Object.keys(entityCounts).map((type) => (
          <div key={type} className="entity-summary-item">
            <span className="entity-type">{type}</span> :{" "}
            <span className="entity-count">{entityCounts[type]}</span>
          </div>
        ))}
      </div>

      {/* Detailed Entity List */}
      <div className="entity-list">
        {entities.map((ent, index) => (
          <div key={index} className="entity-tag">
            <h4>{ent.word}</h4>
            <p className="entity-type">{ent.entity_group}</p>
            <p className="confidence">
              Confidence: {(ent.score * 100).toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NEROutput;
