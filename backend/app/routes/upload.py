from fastapi import APIRouter, UploadFile, File
import os
import shutil
from datetime import datetime

from app.services.pdf_service import extract_text
from app.services.rag_service import store_embeddings, retrieve_chunks
from app.services.llm_service import call_llm
from app.services.query_service import QUESTIONS
from app.services.prompt_service import build_prompt

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        file_path = f"{UPLOAD_DIR}/{timestamp}_{file.filename}"

        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Step 1: Extract text
        extracted_text = extract_text(file_path)

        # Step 2: Store in vector DB
        store_embeddings(extracted_text, doc_id=timestamp)

        # Step 3: Ask questions via RAG
        answers = {}

        for q in QUESTIONS:
            chunks = retrieve_chunks(q)

            context = "\n".join(chunks)

            prompt = build_prompt(context, q)

            response = call_llm(prompt)

            answers[q] = response

        return {
            "message": "Processed with RAG",
            "answers": answers
        }

    except Exception as e:
        return {"error": str(e)}