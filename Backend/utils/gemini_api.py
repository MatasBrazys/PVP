import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
# GEMINI_API_KEY = "AIzaSyCMM1JIn9NgbKkFF5jFQkpj6mJMCv2yQpA"
genai.configure(api_key=GEMINI_API_KEY)

def analyze_text_with_gemini(text):
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = (
        "You are a professional career advisor. Analyze this CV and provide feedback on:\n"
        "1. Strengths and weaknesses.\n"
        "2. Missing skills.\n"
        "3. Career improvement suggestions.\n"
        "4. Industry recommendations based on experience.\n\n"
        f"Here is the CV content:\n{text}"
    )
    response = model.generate_content(prompt)
    return response.text
