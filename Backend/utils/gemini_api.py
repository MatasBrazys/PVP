import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

def analyze_text_with_gemini(text, language="ITA"):
    model = genai.GenerativeModel("gemini-2.0-flash")
    
    prompt = (
        f"You are a professional career advisor and CV expert. Analyze the following CV and return structured feedback **strictly in JSON format**, "
        f"translated into {language} language. Ensure your response contains only valid JSON, without additional text. \n\n"

        "{\n"
        '  "cv_recommendations": [\n'
        '    {"category": "Strengths", "recommendation": "Summarize the key strengths of the CV."},\n'
        '    {"category": "Weaknesses", "recommendation": "Identify areas that need improvement."},\n'
        '    {"category": "Improvement Suggestions", "recommendation": "Provide specific suggestions on how to improve the CV."},\n'
        '    {"category": "Job Suggestions", "recommendation": "Suggest job roles based on skills and experience."},\n'
        '    {"category": "Courses", "recommendation": "Recommend relevant courses or certifications to enhance skills."}\n'
        "  ]\n"
        "}\n\n"

        f"Now, analyze this CV and **only** return the JSON response in {language} language:\n{text}"
    )
    
    response = model.generate_content(prompt)
    
    try:
        structured_response = json.loads(response.text.strip("```json").strip("```").strip())
    except json.JSONDecodeError:
        structured_response = {"error": "Failed to parse AI response as JSON"}
    
    return structured_response
