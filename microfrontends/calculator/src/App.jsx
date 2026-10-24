// La calculadora es un microfrontend que se monta y desmonta cuando el host lo requiere.

import { useState } from "react";

// Convierte el texto del input en número. Si el valor no es un número válido, usa 0.
function readNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

export default function App() {
  // Los inputs guardan texto. El resultado empieza en null para mostrar "—" hasta que se pulse un botón.
  const [first, setFirst] = useState("0");
  const [second, setSecond] = useState("0");
  const [result, setResult] = useState(null);

  return (
    <section className="calculator">
      <h2>Calculator</h2>
      <p className="tag">React</p>
      <div className="fields">
        <label>
          First number
          <input
            type="number"
            value={first}
            onChange={(event) => setFirst(event.target.value)}
          />
        </label>
        <label>
          Second number
          <input
            type="number"
            value={second}
            onChange={(event) => setSecond(event.target.value)}
          />
        </label>
      </div>
      <div className="actions">
        {/* Cada botón guarda la suma o la resta. React vuelve a dibujar el resultado. */}
        <button type="button" onClick={() => setResult(readNumber(first) + readNumber(second))}>
          Add
        </button>
        <button type="button" onClick={() => setResult(readNumber(first) - readNumber(second))}>
          Subtract
        </button>
      </div>
      <p className="result">Result: {result === null ? "—" : result}</p>
    </section>
  );
}
