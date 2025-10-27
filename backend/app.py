from fastapi import FastAPI
from pydantic import BaseModel

# Create the FastAPI app instance
app = FastAPI(title="Demo FastAPI Server", version="1.0.0")

class Item(BaseModel):
    name: str
    price: float
    description: str | None = None

# Root route
@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI demo server!"}

# GET route with path parameter
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "query": q}

# POST route for creating items
@app.post("/items/")
def create_item(item: Item):
    return {"message": "Item created successfully", "item": item}

# Health check route
@app.get("/health")
def health_check():
    return {"status": "OK"}
