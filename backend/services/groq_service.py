from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def generate_recipe_ai(ingredients, diet):

    prompt = f"""
Create a detailed recipe.

Ingredients Available:
{ingredients}

Diet Preference:
{diet}

Provide:

1. Recipe Name
2. Ingredients
3. Instructions
4. Cooking Tips
5. Estimated Nutrition
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.7,
        max_tokens=1000
    )

    return response.choices[0].message.content