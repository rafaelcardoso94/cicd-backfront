import React, { useState } from "react";

function App() {
  const [contador, setContador] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buscarNumero = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/contador`
      );
      if (!response.ok) throw new Error("Erro na requisição");

      const json = await response.json();
      setContador(`${json.mensagem}\nContador: ${json.contador}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Contador</h1>
      <button
        onClick={buscarNumero}
        disabled={loading}
        style={{
          padding: "0.6rem 1.2rem",
          fontSize: "1rem",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Carregando..." : "Buscar Número"}
      </button>

      {contador && (
        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "1.5rem",
            color: "#333",
            whiteSpace: "pre-line",
          }}
        >
          {contador}
        </p>
      )}

      {error && (
        <p
          style={{
            marginTop: "1.5rem",
            color: "red",
            fontWeight: "bold",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default App;