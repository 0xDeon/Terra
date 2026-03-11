"""Router for the Discovery Engine service."""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class DiscoveryRequest(BaseModel):
    user_graph: dict


class DiscoveryResponse(BaseModel):
    recommendations: list[dict]


@router.post("/recommend", response_model=DiscoveryResponse)
async def recommend(request: DiscoveryRequest):
    return DiscoveryResponse(
        recommendations=[
            {"type": "creator", "id": "stub", "name": "Placeholder Creator"},
            {"type": "content", "id": "stub", "title": "Placeholder Content"},
        ],
    )
