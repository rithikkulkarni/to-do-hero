import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./TodoList";
import ShopPage from "./ShopPage";
import SettingsPage from "./SettingsPage";
import LoginPage from "./LoginPage";
import NavBar from "./NavBar";


const themes = {
  default: {
    name: "Default",
    full: "/backgrounds/default-full.jpg",
    buttonImage: null,
    navbarImage: null,
    backgroundColor: "#1b1b1b",
    fontFamily: "'Pixelify Sans', sans-serif",
    fontColor: "#ffffff",
    buttonBg: "#333333",
    buttonBorder: "#ffcc00",
    navBg: "rgba(27, 27, 27, 0.8)",
    navFontColor: "#ffffff"
  },
  forest: {
    name: "Forest",
    full: "/backgrounds/forest-full.jpg",
    buttonImage: "/ui/forest-button.png",
    navbarImage: "/ui/forest-navbar.png",
    backgroundColor: "#142b14",
    fontFamily: "'Pixelify Sans', sans-serif",
    fontColor: "#ddffdd",
    buttonBg: "#225533",
    buttonBorder: "#88cc44",
    navBg: "rgba(20, 40, 20, 0.8)",
    navFontColor: "#ccffcc"
  },
  city: {
    name: "City",
    full: "/backgrounds/city-full.jpg",
    buttonImage: "/ui/city-button.png", 
    navbarImage: "/ui/city-navbar.png",
    backgroundColor: "#1a1a2e",
    fontFamily: "'Pixelify Sans', sans-serif",
    fontColor: "#ddeeff",
    buttonBg: "#222244",
    buttonBorder: "#66aaff",
    navBg: "rgba(20, 20, 40, 0.8)",
    navFontColor: "#ddeeff"
  }
};

function applyTheme(theme) {
  for (const [key, value] of Object.entries(theme)) {
    if (value) {
      document.documentElement.style.setProperty(`--${key}`, value);
    }
  }
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullBg, setFullBg] = useState(themes.default.full);
  const [currentTheme] = useState(themes.default);

  useEffect(() => {
    applyTheme(currentTheme);
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    const storedFull = localStorage.getItem("fullBg");
    if (storedFull) {
      setFullBg(storedFull);
    }
  }, [currentTheme]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          backgroundImage: `url(${fullBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}
      >
        {/* Full-width NavBar at top */}
        <div
          style={{
            width: "100%",
            backgroundColor: "var(--navBg)",
            backgroundImage: currentTheme.navbarImage
              ? `url(${currentTheme.navbarImage})`
              : undefined,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        >
          <NavBar
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            theme={currentTheme}
          />
        </div>

        {/* Main content */}
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(27, 27, 27, 0.6)",
            color: "var(--fontColor)",
            fontFamily: "var(--fontFamily)",
            fontSize: "1.5rem",
            padding: "2rem"
          }}
        >
          <main style={{ padding: "3rem" }}>
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/login" element={<LoginPage onLogin={setIsLoggedIn} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}