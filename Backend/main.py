from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import users, cv_analysis

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(cv_analysis.router, prefix="/cv", tags=["CV Analysis"])
