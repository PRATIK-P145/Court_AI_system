import pdfplumber
import pytesseract
from pdf2image import convert_from_path
from PIL import Image
import os

def extract_text_pdfplumber(file_path):
    text = ""
    try:
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        print("pdfplumber error:", e)
    return text


def extract_text_ocr(file_path):
    text = ""
    try:
        images = convert_from_path(file_path)

        for img in images:
            text += pytesseract.image_to_string(img) + "\n"

    except Exception as e:
        print("OCR error:", e)

    return text


def extract_text(file_path):
    # Step 1: Try normal extraction
    text = extract_text_pdfplumber(file_path)

    # Step 2: If text too small → use OCR
    if len(text.strip()) < 100:
        print("Using OCR fallback...")
        text = extract_text_ocr(file_path)

    return text