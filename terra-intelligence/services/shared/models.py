"""Shared Pydantic base models for Terra Intelligence services."""

from pydantic import BaseModel


class BaseRequest(BaseModel):
    """Base request model for all service endpoints."""

    request_id: str | None = None


class BaseResponse(BaseModel):
    """Base response model for all service endpoints."""

    success: bool = True
    message: str = ""
