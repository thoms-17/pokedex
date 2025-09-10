import { useEffect, useState } from "react";

function App() {
  const [health, setHealth] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/api/health") // Appel vers ton backend
      .then((res) => res.json())
      .then((data) => setHealth(data.message))
      .catch((err) => console.error("Erreur API:", err));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Pokédex Frontend 🚀
        </h1>
        <p className="text-center text-green-600">
          Backend status: {health || "Chargement..."}
        </p>
      </div>
    </div>
  );
}

export default App;
