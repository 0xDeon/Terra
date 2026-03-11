# Terra Intelligence

AI services for **Terra** — a Bitcoin-native social platform built on the Stacks blockchain.

This standalone Python service exposes a single FastAPI application consumed by the `terra-app` API over HTTP.

## AI Systems

### 1. Creator AI Agent (`services/agents/`)
AI agents that act on behalf of creators to interact with fans. Handles automated responses, fan engagement, and creator-driven interactions.

### 2. AI Wallet Assistant (`services/assistant/`)
Helps users understand their wallet activity by explaining transactions in plain language and recommending creators based on on-chain behavior.

### 3. AI Content & NFT Studio (`services/studio/`)
AI-powered creative tools for generating artwork, preparing NFT mint payloads, and assisting creators with content production.

### 4. Discovery Engine (`services/discovery/`)
Personalized recommendation engine that leverages the social graph to surface relevant creators, content, and communities.

## Project Structure

```
terra-intelligence/
├── api/
│   ├── main.py              — FastAPI app entry point
│   └── routers/
│       ├── agents.py         — /agents endpoints
│       ├── assistant.py      — /assistant endpoints
│       ├── studio.py         — /studio endpoints
│       └── discovery.py      — /discovery endpoints
├── services/
│   ├── agents/               — Creator AI Agent service
│   ├── assistant/            — AI Wallet Assistant service
│   ├── studio/               — AI Content & NFT Studio service
│   ├── discovery/            — Discovery Engine service
│   └── shared/               — Shared models and utilities
├── requirements.txt
├── pyproject.toml
├── Dockerfile
└── .env.example
```

## Getting Started

### Prerequisites

- Python >= 3.11
- pip or uv

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Locally

```bash
uvicorn api.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

### Run with Docker

```bash
docker build -t terra-intelligence .
docker run -p 8000:8000 --env-file .env terra-intelligence
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key for LLM services |
| `TERRA_APP_API_KEY` | API key for authenticating with terra-app |
| `STACKS_API_URL` | Stacks blockchain API endpoint |
| `VECTOR_DB_URL` | Vector database URL for embeddings |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/agents/respond` | Creator agent fan response |
| POST | `/assistant/explain-transaction` | Explain a transaction |
| POST | `/assistant/recommend-creators` | Recommend creators |
| POST | `/studio/generate-artwork` | Generate AI artwork |
| POST | `/studio/prepare-mint` | Prepare NFT mint payload |
| POST | `/discovery/recommend` | Get personalized recommendations |
