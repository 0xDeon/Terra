"""Router for the Creator AI Agent service."""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class AgentRequest(BaseModel):
    message: str
    creator_id: str


class AgentResponse(BaseModel):
    reply: str
    creator_id: str


@router.post("/respond", response_model=AgentResponse)
async def respond_to_fan(request: AgentRequest):
    return AgentResponse(
        reply="[stub] This is a placeholder agent response.",
        creator_id=request.creator_id,
    )
