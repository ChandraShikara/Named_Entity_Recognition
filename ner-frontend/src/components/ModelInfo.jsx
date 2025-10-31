import React from "react";
import "../styles/ModelInfo.css";

const ModelInfo = () => {
  return (
    <div className="model-info-container">
      <h1>Model Overview</h1>

      <section className="model-section">
        <p>
          This project demonstrates a <strong>Named Entity Recognition (NER)</strong> system
          that applies advanced <strong>Natural Language Processing (NLP)</strong> and
          <strong> Deep Learning</strong> techniques to automatically detect and classify
          entities such as <strong>names of people, organizations, locations, dates, and numerical expressions</strong>
          from unstructured text.
        </p>
      </section>

      <section className="model-section">
        <h2>Architecture</h2>
        <p>
          The system utilizes a <strong>transformer-based architecture (BERT)</strong>,
          fine-tuned for NER tasks. The model processes text bidirectionally, capturing
          contextual meaning of words to improve accuracy in entity recognition.
        </p>
        <p>
          It has been trained using the <strong>WikiANN dataset</strong>, a multilingual corpus
          designed for general-purpose entity extraction across a variety of topics.
          This allows the model to generalize well across open-domain text data without
          being limited to any specific field.
        </p>
      </section>

      <section className="model-section">
        <h2>Domain Specificity</h2>
        <p>
          The deployed NER model is a <strong>general-domain model</strong>. 
          It is not specialized for any specific area such as healthcare, finance, or law.
          For example, given the sentence:
        </p>
        <blockquote className="example">
          “Amazon reported $143 billion in revenue for Q2 2023.”
        </blockquote>
        <p>
          the model identifies <strong>Amazon</strong> as an <strong>organization</strong>,
          but does not classify <strong>$143 billion</strong> as a financial figure,
          since such domain-specific tagging is not included in this general model.
        </p>
      </section>

      <section className="model-section">
        <h2>Entity Categories & Color Mapping</h2>
        <p>
          The model identifies the following entity types, each represented by a distinct color
          for clarity within the dashboard visualization:
        </p>

        <div className="entity-legend">
          <div className="legend-item" style={{ backgroundColor: "#60a5fa" }}>
            <span>PER — Person</span>
          </div>
          <div className="legend-item" style={{ backgroundColor: "#34d399" }}>
            <span>ORG — Organization</span>
          </div>
          <div className="legend-item" style={{ backgroundColor: "#fbbf24" }}>
            <span>LOC — Location</span>
          </div>
          <div className="legend-item" style={{ backgroundColor: "#f472b6" }}>
            <span>DATE — Date / Time</span>
          </div>
          <div className="legend-item" style={{ backgroundColor: "#a78bfa" }}>
            <span>MISC — Miscellaneous</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModelInfo;
