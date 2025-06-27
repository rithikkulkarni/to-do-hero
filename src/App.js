import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./TodoList";
import ShopPage from "./ShopPage";
import SettingsPage from "./SettingsPage";
import LoginPage from "./LoginPage";
import NavBar from "./NavBar";
import PixelButton from "./PixelButton";

const theme = {
  backgroundColor: "#1b1b1b",
  fontFamily: "'Pixelify Sans', sans-serif",
  fontColor: "#ffffff",
  buttonBg: "#333333",
  buttonBorder: "#ffcc00"
};

function applyTheme(theme) {
  for (const [key, value] of Object.entries(theme)) {
    document.documentElement.style.setProperty(`--${key}`, value);
  }
}

const themes = {
  default: {
    name: "Default",
    left: "/backgrounds/default-left.png",
    right: "/backgrounds/default-right.png"
  },
  forest: {
    name: "Forest",
    left: "/backgrounds/forest-left.png",
    right: "/backgrounds/forest-right.png"
  },
  city: {
    name: "City",
    left: "/backgrounds/city-left.png",
    right: "/backgrounds/city-right.png"
  }
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const leftBg = localStorage.getItem("leftBg") || "/backgrounds/default-left.png";
  const rightBg = localStorage.getItem("rightBg") || "/backgrounds/default-right.png";

  useEffect(() => {
    applyTheme(theme);
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
        <div
          style={{
            width: "33.33vw",
            backgroundImage: `url(${leftBg})`,
            backgroundSize: "cover"
          }}
        />
        <div
          style={{
            width: "33.33vw",
            backgroundColor: "var(--backgroundColor)",
            color: "var(--fontColor)",
            fontFamily: "var(--fontFamily)",
            display: "flex",
            flexDirection: "column",
            fontSize: "1.5rem",
            padding: "2rem",
            alignItems: "center"
          }}
        >
          <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <main
            style={{
              padding: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1
            }}
          >
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/login" element={<LoginPage onLogin={setIsLoggedIn} />} />
            </Routes>
          </main>
        </div>
        <div
          style={{
            width: "33.33vw",
            backgroundImage: `url(${rightBg})`,
            backgroundSize: "cover"
          }}
        />
      </div>
    </Router>
  );
}
