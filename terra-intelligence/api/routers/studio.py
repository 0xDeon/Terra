"""Router for the AI Content and NFT Studio service."""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ArtworkRequest(BaseModel):
    prompt: str


class ArtworkResponse(BaseModel):
    asset_url: str
    metadata: dict


class MintRequest(BaseModel):
    asset_data: dict


class MintResponse(BaseModel):
    payload: dict


@router.post("/generate-artwork", response_model=ArtworkResponse)
async def generate_artwork(request: ArtworkRequest):
    return ArtworkResponse(
        asset_url="https://placeholder.terra/artwork/stub.png",
        metadata={"prompt": request.prompt, "status": "stub"},
    )


@router.post("/prepare-mint", response_model=MintResponse)
async def prepare_mint(request: MintRequest):
    return MintResponse(
        payload={"tx_type": "mint", "status": "stub"},
    )
