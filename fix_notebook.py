import nbformat

path = "ner_implementation_model.ipynb"
nb = nbformat.read(path, as_version=4)

if "widgets" in nb.get("metadata", {}):
    nb["metadata"].pop("widgets", None)

nbformat.write(nb, path)
print("Fixed notebook metadata and saved.")
