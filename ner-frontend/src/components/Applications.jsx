import React from "react";
import { motion } from "framer-motion";
import "../styles/Applications.css";

const Applications = () => {
  const apps = [
    {
      title: "Healthcare",
      desc: "Extracts diseases, medications, symptoms, and patient details from unstructured clinical notes. Enables automated diagnosis reports and medical data summarization.",
      icon: "💊",
    },
    {
      title: "Finance & Banking",
      desc: "Identifies company names, stock symbols, and financial metrics in news and reports, aiding in automated financial analysis and fraud detection systems.",
      icon: "💰",
    },
    {
      title: "Customer Support & Chatbots",
      desc: "Helps bots understand entities such as names, dates, order IDs, and issue categories — resulting in context-aware, intelligent customer support responses.",
      icon: "🤖",
    },
    {
      title: "Cybersecurity",
      desc: "Detects sensitive information like credentials, IPs, and organization names from logs, improving information extraction for threat detection systems.",
      icon: "🛡️",
    },
    {
      title: "Media & Journalism",
      desc: "Automatically tags people, places, and events in articles and transcripts, enhancing searchability and recommendation in content management systems.",
      icon: "📰",
    },
    {
      title: "Social Media Monitoring & Brand Analysis",
      desc: "Analyzes posts, tweets, and online discussions to identify brands, people, and locations being mentioned. Enables sentiment-based entity tracking for marketing and reputation management.",
      icon: "📱",
    },
  ];

  return (
    <motion.div
      className="applications-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Applications of Named Entity Recognition</h2>
      <p className="intro">
        Named Entity Recognition (NER) is one of the most powerful NLP
        components, capable of transforming large volumes of text into
        structured, meaningful data. Below are some key real-world use cases
        where NER is creating a massive impact across industries.
      </p>

      <div className="applications-grid">
        {apps.map((app, index) => (
          <motion.div
            key={index}
            className="app-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="app-icon">{app.icon}</div>
            <h3>{app.title}</h3>
            <p>{app.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Applications;
