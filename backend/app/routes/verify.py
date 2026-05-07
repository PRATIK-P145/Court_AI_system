from fastapi import APIRouter
from app.database.mock_db import approved_cases

router = APIRouter()

@router.post("/verify")
async def verify_case(data: dict):

    approved_cases.append(data)

    return {
        "message": "Case approved successfully"
    }