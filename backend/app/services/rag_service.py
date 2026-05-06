import chromadb
from sentence_transformers import SentenceTransformer

# Initialize embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Initialize ChromaDB (local)
chroma_client = chromadb.Client()

# Create collection
collection = chroma_client.get_or_create_collection(name="court_cases")


# 🔹 Chunking
def chunk_text(text, chunk_size=500):
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]


# 🔹 Store embeddings
def store_embeddings(text, doc_id):
    chunks = chunk_text(text)

    embeddings = model.encode(chunks).tolist()

    ids = [f"{doc_id}_{i}" for i in range(len(chunks))]

    collection.add(
        documents=chunks,
        embeddings=embeddings,
        ids=ids
    )

    return chunks


# 🔹 Retrieve relevant chunks
def retrieve_chunks(query, top_k=5):
    query_embedding = model.encode([query]).tolist()

    results = collection.query(
        query_embeddings=query_embedding,
        n_results=top_k
    )

    return results['documents'][0]