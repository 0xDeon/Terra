"""Terra Intelligence — FastAPI application entry point."""

from fastapi import FastAPI

from api.routers import agents, assistant, studio, discovery

app = FastAPI(
    title="Terra Intelligence",
    description="AI services for the Terra Bitcoin-native social platform",
    version="0.1.0",
)

app.include_router(agents.router, prefix="/agents", tags=["agents"])
app.include_router(assistant.router, prefix="/assistant", tags=["assistant"])
app.include_router(studio.router, prefix="/studio", tags=["studio"])
app.include_router(discovery.router, prefix="/discovery", tags=["discovery"])


@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "terra-intelligence"}
