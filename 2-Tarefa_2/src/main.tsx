import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Footer } from "./components/Footer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Footer />
  </StrictMode>
);
