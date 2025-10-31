# 🧠 Named Entity Recognition (NER) Application

## 📌 Overview
This project is a **Named Entity Recognition (NER)** system built using a fine-tuned Transformer model trained on the **WikiANN multilingual dataset**.  
It identifies entities such as **persons (PER)**, **organizations (ORG)**, and **locations (LOC)** from input text.

The app integrates a **FastAPI backend** with a **React frontend**, forming a hybrid **MERN-style architecture** — combining modern web technologies with a robust deep learning pipeline.

---

## 🚀 Key Features
- 🔍 Extracts named entities (PER, ORG, LOC, etc.)
- 🧩 Uses a fine-tuned Transformer model (`bert-base-cased` variant trained on WikiANN)
- 💾 MongoDB integration for storing users and queries
- ⚡ FastAPI backend serving predictions
- 💻 React-based frontend with a styled dashboard and model overview
- 🧠 Modular architecture — easy to retrain or replace models

---

## 🏗️ Tech Stack

| Layer | Technology Used | Purpose |
|-------|-----------------|----------|
| **Frontend** | React + Vite | Interactive user interface |
| **Backend** | FastAPI (Python) | Model serving & API endpoints |
| **Database** | MongoDB | Stores user queries & logs |
| **Model** | Hugging Face Transformers | NER model trained on WikiANN |
| **Styling** | CSS3 / Bootstrap | Dashboard & layout |
| **Runtime** | Node.js / Python v3.12 | Execution environment |

---

## 🧠 Model Information

- **Dataset:** [WikiANN (Wikipedia Annotated NER)](https://huggingface.co/datasets/wikiann)
- **Architecture:** BERT (fine-tuned for NER)
- **Classes:** PER (Person), ORG (Organization), LOC (Location)
- **Training:** The model was trained and exported to `NER_aPP/ner_model/`
- **Serving:** Loaded dynamically in FastAPI via the `ner_model_loader.py`

---

## 📁 Folder Structure

Named_Entity_Recognition
│
├── NER_aPP/ # Backend (FastAPI)
│ ├── main.py # Entry point
│ ├── auth.py # Authentication utilities
│ ├── database.py # MongoDB integration
│ ├── ner_model/ # Saved model checkpoints
│ ├── ner_model_loader.py # Model loader using transformers
│ ├── utils/ # Helper functions
│ ├── requirements.txt # Backend dependencies
│ └── .env # Environment variables
│
├── ner-frontend/ # Frontend (React + Vite)
│ ├── src/
│ │ ├── components/
│ │ │ ├── NERInput.jsx # Text input component
│ │ │ ├── NEROutput.jsx # Entity output view
│ │ │ ├── Dashboard.jsx # App overview + stats
│ │ │ ├── ModelInfo.jsx # Model description & domain
│ │ │ ├── Navbar.jsx # Top navigation bar
│ │ ├── styles/ # CSS for each component
│ ├── package.json
│ ├── vite.config.js
│ └── index.html
│
├── ner_implementation_model.ipynb # Jupyter notebook training log
├── .gitignore # Ignored large/model files
└── README.md # Project documentation

---

## ⚙️ Installation & Setup

### 🧩 Backend Setup (FastAPI) & Frontend Setup
```bash
cd NER_aPP
python -m venv venv
venv\Scripts\activate     # (Windows)
pip install -r requirements.txt
uvicorn main:app --reload
## frontend
cd ner-frontend
npm install
npm run dev
## .env setup
MONGO_URI = your_mongodb_connection_string
DB_NAME = ner_database



