from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, status
import pdfplumber
import docx
import os
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from models import User, Subscription, CV
from database import SessionLocal
from passlib.context import CryptContext
import datetime


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

GEMINI_API_KEY = "AIzaSyDlBLPheUB_o5mKERKqLZKVE-UtYbRkIoM"
genai.configure(api_key=GEMINI_API_KEY)


#Registracija

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserCreate(BaseModel):
    name: str
    last_name: str
    email: str
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_subscription(db: Session):

    db_subscription = Subscription(
        date_from=datetime.date.today(),
        date_to=None,
        subscription='free'
    )
    db.add(db_subscription)
    db.commit()
    db.refresh(db_subscription)
    return db_subscription

def create_user(db: Session, user: UserCreate):

    db_subscription = create_subscription(db)
    

    hashed_password = pwd_context.hash(user.password)
    db_user = User(
        name=user.name,
        last_name=user.last_name,
        email=user.email,
        password=hashed_password,
        fk_Subscription=db_subscription.id_Subscription  
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    print(user)
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db=db, user=user)


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

