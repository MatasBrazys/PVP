from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import cv_analysis, login, register

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes

app.include_router(cv_analysis.router, prefix="/cv", tags=["CV Analysis"])
app.include_router(login.router, prefix="/user", tags=["Login"])
app.include_router(register.router, prefix="/user", tags=["Register"])

