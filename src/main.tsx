import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./styles/global.css";

// Il ripristino automatico del browser rimette la pagina dov'era alla visita
// precedente, e lo fa a caricamento finito: arriva dopo il nostro scroll in
// cima e vince lui, così il sito si apre già spostato. Lo scroll lo decide
// `useRouteScroll`, quindi qui si spegne.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
