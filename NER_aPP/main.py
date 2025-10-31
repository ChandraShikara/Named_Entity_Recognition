# from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware
# from ner_model_loader import load_ner_pipeline  # ✅ import your loader function
# from pymongo import MongoClient
# from dotenv import load_dotenv
# import os

# # =========================================================
# # 1️⃣ Initialize FastAPI app
# # =========================================================
# app = FastAPI()

# # =========================================================
# # 2️⃣ Enable CORS (for React frontend)
# # =========================================================
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # change to ["http://localhost:5173"] for security
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # =========================================================
# # 3️⃣ Load Environment Variables & Connect MongoDB
# # =========================================================
# load_dotenv()
# MONGO_URI = os.getenv("MONGO_URI")
# DB_NAME = os.getenv("DB_NAME")

# client = MongoClient(MONGO_URI)
# db = client[DB_NAME]
# queries_col = db["queries"]

# print("✅ MongoDB connected successfully")

# # =========================================================
# # 4️⃣ Load NER Model
# # =========================================================
# nlp = load_ner_pipeline()  # from ner_model_loader.py

# # =========================================================
# # 5️⃣ Routes
# # =========================================================
# @app.get("/")
# def home():
#     return {"message": "✅ NER API is running successfully"}

# @app.post("/query")
# async def get_prediction(request: Request):
#     data = await request.json()
#     text = data.get("text", "").strip()

#     if not text:
#         return {"error": "Text cannot be empty"}

#     try:
#         # Run NER inference
#         entities = nlp(text)

#         # ✅ Format entities (remove "##", strip spaces)
#         formatted_entities = [
#             {
#                 "entity_group": ent["entity_group"],
#                 "word": ent["word"].replace("##", "").strip(),
#                 "score": round(float(ent["score"]), 4),
#             }
#             for ent in entities
#         ]

#         # ✅ Log query to MongoDB
#         queries_col.insert_one({
#             "text": text,
#             "entities": formatted_entities
#         })

#         # ✅ Return clean response
#         return {"text": text, "entities": formatted_entities}

#     except Exception as e:
#         print("❌ Error during NER processing:", e)
#         return {"error": str(e)}

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from ner_model_loader import load_ner_pipeline  # ✅ import your loader function
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import re  # 👈 Added for regex pattern matching

# =========================================================
# 1️⃣ Initialize FastAPI app
# =========================================================
app = FastAPI()

# =========================================================
# 2️⃣ Enable CORS (for React frontend)
# =========================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to ["http://localhost:5173"] for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================================
# 3️⃣ Load Environment Variables & Connect MongoDB
# =========================================================
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
queries_col = db["queries"]

print("✅ MongoDB connected successfully")

# =========================================================
# 4️⃣ Load NER Model
# =========================================================
nlp = load_ner_pipeline()  # from ner_model_loader.py


# =========================================================
# 5️⃣ Smart Enhancer for DATE / MISC
# =========================================================
def enhance_entities(text, entities):
    """Enhance model predictions with regex-based DATE and MISC detections."""
    extra_entities = []

    # --- DATE/TIME patterns ---
    date_patterns = [
        r"\b(?:\d{1,2}[-/th|st|nd|rd\s]*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*[-/\s]*\d{0,4})\b",
        r"\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\s\d{1,2},?\s?\d{0,4}\b",
        r"\b\d{4}\b",
        r"\b(?:Q[1-4]\s?\d{4})\b",
        r"\b(?:today|yesterday|tomorrow|last\sweek|next\smonth)\b",
    ]

    for pattern in date_patterns:
        for match in re.finditer(pattern, text, re.IGNORECASE):
            extra_entities.append({
                "word": match.group(),
                "entity_group": "DATE",
                "score": 0.99
            })

    # --- MISC patterns ---
    misc_patterns = [
        r"\$[0-9]+(?:\.[0-9]+)?\s?(?:billion|million|thousand|bn|m|k)?",
        r"\b\d+(?:\.\d+)?\s?(?:USD|INR|EUR|dollars|rupees)\b",
        r"\b(version\s?\d+|model\s?\w+|covid[-\s]19|AI\smodel|algorithm)\b",
        r"\b\d+(?:st|nd|rd|th)?\s(edition|anniversary)\b",
    ]

    for pattern in misc_patterns:
        for match in re.finditer(pattern, text, re.IGNORECASE):
            extra_entities.append({
                "word": match.group(),
                "entity_group": "MISC",
                "score": 0.95
            })

    # --- Merge without duplicates ---
    existing_words = {ent["word"].lower() for ent in entities}
    merged = entities + [e for e in extra_entities if e["word"].lower() not in existing_words]

    return merged


# =========================================================
# 6️⃣ Routes
# =========================================================
@app.get("/")
def home():
    return {"message": "✅ NER API is running successfully"}


@app.post("/query")
async def get_prediction(request: Request):
    data = await request.json()
    text = data.get("text", "").strip()

    if not text:
        return {"error": "Text cannot be empty"}

    try:
        # Run NER inference
        entities = nlp(text)

        # ✅ Format entities (remove "##", strip spaces)
        formatted_entities = [
            {
                "entity_group": ent["entity_group"],
                "word": ent["word"].replace("##", "").strip(),
                "score": round(float(ent["score"]), 4),
            }
            for ent in entities
        ]

        # ✅ Enhance with DATE & MISC (new addition)
        enhanced_entities = enhance_entities(text, formatted_entities)

        # ✅ Log to MongoDB
        queries_col.insert_one({
            "text": text,
            "entities": enhanced_entities
        })

        # ✅ Return response
        return {"text": text, "entities": enhanced_entities}

    except Exception as e:
        print("❌ Error during NER processing:", e)
        return {"error": str(e)}

