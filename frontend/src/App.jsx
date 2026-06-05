import "./index.css";
import Hero from "./components/Hero";
import RecipeForm from "./components/RecipeForm";
import Stats from "./components/Stats";

function App() {
  return (
    <div className="app">

      <div className="floating food1">🍕</div>
      <div className="floating food2">🍔</div>
      <div className="floating food3">🥗</div>
      <div className="floating food4">🍜</div>
      <div className="floating food5">🍩</div>

      <div className="hero-card">
        <Hero />
        <Stats />
        <RecipeForm />
      </div>

    </div>
  );
}

export default App;