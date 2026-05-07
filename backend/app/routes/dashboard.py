from fastapi import APIRouter
from app.database.mock_db import approved_cases

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard():

    return {
        "total_cases": len(approved_cases),
        "cases": approved_cases
    }