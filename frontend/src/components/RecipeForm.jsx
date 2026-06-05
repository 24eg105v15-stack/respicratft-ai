import { useState, useEffect } from "react";
import API from "../services/api";

function RecipeForm() {
  const [ingredients, setIngredients] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [diet, setDiet] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("recipeHistory")) || [];

    setHistory(saved);
  }, []);

  const generateRecipe = async () => {
    if (!ingredients) {
      alert("Please enter ingredients");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/generate-recipe", {
        ingredients,
        cookingTime,
        diet,
      });

      setRecipe(response.data.recipe);

      const updatedHistory = [
        response.data.recipe,
        ...history,
      ];

      setHistory(updatedHistory);

      localStorage.setItem(
        "recipeHistory",
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.log(error);
      alert("Error generating recipe");
    }

    setLoading(false);
  };

  return (
    <div className="recipe-form">

      <h2>Create Your Recipe</h2>

      <input
        type="text"
        placeholder="Ingredients (Chicken, Onion, Tomato)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      

      <div className="diet-buttons">

  <button
    className={diet === "Vegetarian" ? "active-diet" : ""}
    onClick={() => setDiet("Vegetarian")}
    type="button"
  >
    🥗 Vegetarian
  </button>

  <button
    className={diet === "Vegan" ? "active-diet" : ""}
    onClick={() => setDiet("Vegan")}
    type="button"
  >
    🌱 Vegan
  </button>

  <button
    className={diet === "Non-Vegetarian" ? "active-diet" : ""}
    onClick={() => setDiet("Non-Vegetarian")}
    type="button"
  >
    🍗 Non-Vegetarian
  </button>

</div>

      <button
        onClick={generateRecipe}
        disabled={loading}
      >
        {loading
          ? "🤖 Generating Recipe..."
          : "✨ Generate Recipe"}
      </button>

      {recipe && (
        <div className="recipe-output">
          <h3>Generated Recipe</h3>
          <pre>{recipe}</pre>
        </div>
      )}

      {history.length > 0 && (
  <div className="history-section">
    <h3>📜 Recipe History</h3>

    {history.slice(0, 5).map((item, index) => {

      const title =
        item
          .split("\n")
          .find(
            line =>
              line.toLowerCase().includes("recipe name")
          ) ||
        item.split("\n")[0];

      return (
        <div
          key={index}
          className="history-card"
          onClick={() => setRecipe(item)}
        >
          {title.replace("Recipe Name:", "").trim()}
        </div>
      );
    })}
  </div>
)}
    </div>
  );
}

export default RecipeForm;