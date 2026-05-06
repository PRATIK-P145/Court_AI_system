import json

def parse_llm_response(response_text):
    try:
        return json.loads(response_text)
    except:
        # fallback fix (very useful)
        try:
            cleaned = response_text.strip().replace("```json", "").replace("```", "")
            return json.loads(cleaned)
        except:
            return {"error": "Invalid JSON from LLM", "raw": response_text}