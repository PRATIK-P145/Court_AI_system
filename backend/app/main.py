from fastapi import FastAPI
from app.routes import upload
from fastapi.middleware.cors import CORSMiddleware
from app.routes import upload, verify, dashboard

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(verify.router)
app.include_router(dashboard.router)

@app.get("/")
def root():
    return {"message": "Backend running"}