"""Router for the AI Wallet Assistant service."""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class TransactionRequest(BaseModel):
    tx_data: dict


class TransactionResponse(BaseModel):
    explanation: str


class RecommendRequest(BaseModel):
    user_profile: dict


class RecommendResponse(BaseModel):
    creators: list[dict]


@router.post("/explain-transaction", response_model=TransactionResponse)
async def explain_transaction(request: TransactionRequest):
    return TransactionResponse(
        explanation="[stub] This is a placeholder transaction explanation.",
    )


@router.post("/recommend-creators", response_model=RecommendResponse)
async def recommend_creators(request: RecommendRequest):
    return RecommendResponse(
        creators=[{"id": "stub", "name": "Placeholder Creator"}],
    )
