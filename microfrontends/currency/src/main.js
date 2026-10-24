// El conversor de moneda es un microfrontend que se monta y desmonta cuando el host lo requiere.

import "./style.css";

// Tasa constante para simplificar el ejemplo.
const COP_PER_USD = 3200;

function format(value, currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

// La función mount dibuja/monta el conversor dentro del elemento HTML que se le pasa a la función (por lo general, se pasa un div).
// En el archivo host/src/MicroFrontendView.vue línea 37 se monta este conversor llamando a esta función mount.
// La función mount retorna una función que quita el formulario y su listener cuando el host desmonta este microfrontend.
// En el archivo host/src/MicroFrontendView.vue línea 48 se desmonta este microfrontend llamando a la función que retorna la función mount.
export function mount(el) {
  el.innerHTML = `
    <section class="currency">
      <h2>Peso / dollar converter</h2>
      <p class="tag">JavaScript</p>
      <p class="rate">Fixed demo rate: 1 USD = ${COP_PER_USD.toLocaleString("en-US")} COP</p>
      <form>
        <label>
          Amount
          <input name="amount" type="number" min="0" step="0.01" value="3200" required />
        </label>
        <label>
          From
          <select name="from">
            <option value="COP">COP</option>
            <option value="USD">USD</option>
          </select>
        </label>
        <button type="submit">Convert</button>
      </form>
      <p class="result">Result: —</p>
    </section>
  `;

  const form = el.querySelector("form");
  const result = el.querySelector(".result");

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const amount = Number(data.get("amount"));
    const from = data.get("from");
    if (!Number.isFinite(amount)) return;

    if (from === "COP") {
      result.textContent = `Result: ${format(amount / COP_PER_USD, "USD")}`;
    } else {
      result.textContent = `Result: ${format(amount * COP_PER_USD, "COP")}`;
    }
  };

  form.addEventListener("submit", onSubmit);

  // Esta función se llama cuando el host desmonta el microfrontend de conversión de divisas.
  // Remueve el event listener del formulario y limpia el contenido del elemento.
  return () => {
    form.removeEventListener("submit", onSubmit);
    el.innerHTML = "";
  };
}

// El código siguiente busca un elemento id="app" en el HTML
// Si existe, muestra automáticamente el conversor dentro de él mediante mount(standalone).
// Si no existe, no hace nada, permitiendo que otra aplicación (el host) decida dónde y
// Cuándo mostrar el conversor llamando a mount() con su propio contenedor.
const standalone = document.querySelector("#app");
if (standalone) mount(standalone);

// Lo anterior permite que este archivo se ejecute como una aplicación independiente (localhost:5176)
// O como un microfrontend en otra aplicación (ej: en el host).
