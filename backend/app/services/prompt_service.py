def build_prompt(context, question):
    return f"""
You are a legal AI assistant.

Answer the question based ONLY on the context.

Return concise answer.

Context:
{context}

Question:
{question}
"""