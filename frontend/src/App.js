import React, { useState } from "react";

function App() {
  const [numero, setNumero] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buscarNumero = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/contador`);
      // const response = await fetch("http://localhost:8080/contador");
      if (!response.ok) throw new Error("Erro na requisição");
      const texto = await response.text();
      setNumero(texto);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Contador</h1>
      <button onClick={buscarNumero} disabled={loading}>
        {loading ? "Carregando..." : "Buscar Número"}
      </button>
      {numero && <p style={{ marginTop: "1rem", fontSize: "1.5rem" }}>{numero}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
