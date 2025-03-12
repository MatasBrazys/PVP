from fastapi import APIRouter, UploadFile, File, HTTPException
import os
from utils.text_extraction import extract_text_from_pdf, extract_text_from_docx
from utils.gemini_api import analyze_text_with_gemini

router = APIRouter()

@router.post("/analyze-cv/")
async def analyze_cv(file: UploadFile = File(...)):
    file_location = f"temp/{file.filename}"
    os.makedirs("temp", exist_ok=True)

    with open(file_location, "wb") as buffer:
        buffer.write(await file.read())

    if file.filename.endswith(".pdf"):
        text = extract_text_from_pdf(file_location)
    elif file.filename.endswith(".docx"):
        text = extract_text_from_docx(file_location)
    else:
        os.remove(file_location)
        raise HTTPException(status_code=400, detail="Unsupported file format. Use PDF or DOCX.")
    
    os.remove(file_location)
    
    ai_feedback = analyze_text_with_gemini(text)

    return {"analysis": ai_feedback}
