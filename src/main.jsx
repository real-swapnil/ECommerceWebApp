import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider
    clientId={
      "1004612977020-o9ifsdaigs6s3i3cu67kcs7fp4l2iua0.apps.googleusercontent.com"
    }
    redirectUri="http://localhost:5173"
  >
    <App />
  </GoogleOAuthProvider>
);
