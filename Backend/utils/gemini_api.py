import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
# GEMINI_API_KEY = "AIzaSyCMM1JIn9NgbKkFF5jFQkpj6mJMCv2yQpA"
genai.configure(api_key=GEMINI_API_KEY)

def analyze_text_with_gemini(text):
    model = genai.GenerativeModel("gemini-2.0-flash")
    prompt = (
        "You are a professional career advisor. Analyze this CV and provide feedback on:\n"
        "1. Give keypoints of strenghts and weaknesess.\n"
        "2. Point out ares where you can impove CV.\n"
        "3. Suggest jobs for this person.\n\n"
        
        f"Here is the CV content:\n{text}"
    )
    response = model.generate_content(prompt)
    return response.text
