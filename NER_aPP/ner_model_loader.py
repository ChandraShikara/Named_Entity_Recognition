from transformers import AutoTokenizer, AutoModelForTokenClassification, pipeline

def load_ner_pipeline():
    """
    Loads a Named Entity Recognition (NER) pipeline from a local Hugging Face model directory.
    Returns a ready-to-use pipeline for entity extraction.
    """
    model_path = "./ner_model"  # Local path to your fine-tuned model
    
    # Load model and tokenizer
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForTokenClassification.from_pretrained(model_path)
    
    # Create the NER pipeline with simple aggregation (merges subwords into single entities)
    nlp_pipeline = pipeline(
        "ner",
        model=model,
        tokenizer=tokenizer,
        aggregation_strategy="simple"
    )
    
    print("✅ NER pipeline loaded successfully!")
    return nlp_pipeline
