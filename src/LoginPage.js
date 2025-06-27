import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PixelButton from "./PixelButton";

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const toggleMode = () => setMode(mode === "login" ? "signup" : "login");

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    onLogin(true);
    navigate("/");
  };

  return (
    <div
      style={{
        fontFamily: "var(--fontFamily)",
        backgroundColor: "#2a2a2a",
        padding: "2rem",
        borderRadius: "0px",
        border: "4px solid var(--buttonBorder)",
        boxShadow: "0 6px #000"
      }}
    >
      <h2>{mode === "login" ? "Login" : "Create Account"}</h2>
      <input type="text" placeholder="Username" style={{ display: "block", margin: "1rem 0", padding: "0.5rem", width: "100%" }} />
      <input type="password" placeholder="Password" style={{ display: "block", margin: "1rem 0", padding: "0.5rem", width: "100%" }} />
      <PixelButton onClick={handleLogin}>{mode === "login" ? "Login" : "Create Account"}</PixelButton>
      <PixelButton onClick={toggleMode} sound="click">
        {mode === "login" ? "New user? Create an account" : "Already have an account? Login"}
      </PixelButton>
    </div>
  );
}