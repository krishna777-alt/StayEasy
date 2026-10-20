import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/app.js";
import AuthInitalizer from "./features/auth/AuthInitalizer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitalizer>
        <App />
      </AuthInitalizer>
    </Provider>
  </StrictMode>,
);
