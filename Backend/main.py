from fastapi import FastAPI, File, UploadFile, HTTPException
import pdfplumber
import docx
import os
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to ["http://localhost:3000"] for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
GEMINI_API_KEY = "AIzaSyDlBLPheUB_o5mKERKqLZKVE-UtYbRkIoM"
genai.configure(api_key=GEMINI_API_KEY)


#Registracijos Backas
mock_db = []

class RegisterData(BaseModel):
    name: str
    surname: str
    email: str
    password: str


@app.post("/register")
async def register(data: RegisterData):

    if any(user['email'] == data.email for user in mock_db):
        raise HTTPException(status_code=400, detail="Email already registered")
        
    mock_db.append(data.dict())
    return {"message": "Registration successful"}

@app.get("/users")
async def get_users():
    return mock_db
# try:
#     model = genai.GenerativeModel("gemini-1.5-flash")
#     response = model.generate_content("Hello! Can you analyze a CV?")
#     print(response.text)
# except Exception as e:
#     print("Gemini API Error:", e)

def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file."""
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            extracted_text = page.extract_text()
            if extracted_text:
                text += extracted_text + "\n"
    return text

def extract_text_from_docx(docx_path):
    """Extract text from a DOCX file."""
    doc = docx.Document(docx_path)
    return "\n".join([para.text for para in doc.paragraphs])

def analyze_text_with_gemini_free(text):
    """Use Google's free Gemini API to analyze the CV text."""
    model = genai.GenerativeModel("gemini-1.5-flash")  # Free version
    prompt = (
        "You are a professional career advisor. Analyze this CV and provide feedback on:"
        " 1. Strengths and weaknesses."
        " 2. Missing skills."
        " 3. Career improvement suggestions."
        " 4. Industry recommendations based on experience."
        "\n\nHere is the CV content:\n"
        f"{text}"
    )

    response = model.generate_content(prompt)
    return response.text

@app.post("/analyze-cv/")
async def analyze_cv(file: UploadFile = File(...)):
    """Endpoint to upload and analyze a CV file."""
    file_location = f"temp/{file.filename}"
    os.makedirs("temp", exist_ok=True)

    with open(file_location, "wb") as buffer:
        buffer.write(await file.read())

    # Extract text from uploaded file
    if file.filename.endswith(".pdf"):
        text = extract_text_from_pdf(file_location)
    elif file.filename.endswith(".docx"):
        text = extract_text_from_docx(file_location)
    else:
        return {"error": "Unsupported file format. Use PDF or DOCX."}
    
    os.remove(file_location)  # Clean up temp file

    ai_feedback = analyze_text_with_gemini_free(text)

    return {"analysis": ai_feedback}
