from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from services.groq_service import generate_recipe_ai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecipeRequest(BaseModel):
    ingredients: str
    diet: str

@app.get("/")
def home():
    return {
        "message": "Backend Working"
    }

@app.post("/generate-recipe")
def generate_recipe(data: RecipeRequest):

    recipe = generate_recipe_ai(
        data.ingredients,
        data.diet
    )

    return {
        "recipe": recipe
    }