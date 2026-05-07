from app.services.llm_service import call_llm
import json

def generate_action_plan(rag_answers):

    prompt = f"""
You are an AI legal governance assistant.

Based on the extracted court judgment information below, generate a structured government action plan.

Extracted Information:
{json.dumps(rag_answers, indent=2)}

Return ONLY valid JSON in this format:

{{
  "recommended_action": "",
  "priority": "",
  "deadline": "",
  "department": "",
  "reason": "",
  "tasks": [
    {{
      "task": "",
      "owner": "",
      "timeline": ""
    }}
  ]
}}

Rules:
- recommended_action must be one of:
  ["Comply", "Consider Appeal", "Review Required"]

- priority must be:
  ["Low", "Medium", "High", "Critical"]

- department should be inferred logically

- reason must explain WHY action was suggested

- tasks should be administrative and actionable

Return only JSON.
"""

    response = call_llm(prompt)

    try:
        cleaned = response.replace("```json", "").replace("```", "").strip()
        return json.loads(cleaned)

    except Exception as e:
        return {
            "error": "Failed to parse action plan",
            "raw_response": response
        }