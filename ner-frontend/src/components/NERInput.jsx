import React from "react";
import { motion } from "framer-motion";

const NERInput = ({ text, setText, analyzeText, loading }) => {
  return (
    <motion.div
      className="input-card glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>Enter Text for Named Entity Recognition</h2>
      <textarea
        placeholder="Type your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={analyzeText} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Text"}
      </button>
    </motion.div>
  );
};

export default NERInput;
