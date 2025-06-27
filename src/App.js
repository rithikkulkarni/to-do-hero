import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

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

const sounds = {
  click: new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"),
  remove: new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"),
  add: new Audio("https://actions.google.com/sounds/v1/cartoon/pop.ogg")
};

function playSound(name) {
  if (sounds[name]) {
    sounds[name].currentTime = 0;
    sounds[name].play();
  }
}

function PixelButton({ children, onClick, sound = "click" }) {
  const handleClick = () => {
    playSound(sound);
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: "var(--buttonBg)",
        border: "4px solid var(--buttonBorder)",
        color: "var(--fontColor)",
        fontFamily: "var(--fontFamily)",
        padding: "1rem 1.5rem",
        margin: "0.5rem",
        cursor: "pointer",
        borderRadius: "12px",
        boxShadow: "0 4px #999",
        fontSize: "1rem",
        transition: "all 0.2s ease"
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    >
      {children}
    </button>
  );
}

function TrashIcon() {
  return <span style={{ display: "inline-block", transform: "scale(1.2)" }}>🗑️</span>;
}

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input.trim()]);
      setInput("");
      playSound("add");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    playSound("remove");
  };

  return (
    <div
      style={{
        backgroundColor: "#2a2a2a",
        padding: "1rem",
        borderRadius: "16px",
        border: "4px solid var(--buttonBorder)",
        boxShadow: "0 6px #000",
        maxWidth: "400px",
        margin: "0 auto"
      }}
    >
      <h2 style={{ fontFamily: "var(--fontFamily)", marginBottom: "1rem" }}>To-Do List</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          fontFamily: "var(--fontFamily)",
          padding: "0.5rem",
          marginRight: "0.5rem",
          borderRadius: "8px",
          border: "2px solid var(--buttonBorder)",
          fontSize: "1rem",
          transition: "transform 0.2s ease"
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
      />
      <PixelButton onClick={addTask} sound="add">Add</PixelButton>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              fontFamily: "var(--fontFamily)",
              color: "var(--fontColor)",
              marginTop: "0.5rem",
              backgroundColor: "#444",
              padding: "0.5rem 1rem",
              borderRadius: "10px",
              border: "2px solid var(--buttonBorder)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            {task}
            <PixelButton onClick={() => removeTask(index)} sound="remove">
              <TrashIcon />
            </PixelButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ShopPage() {
  return <h2 style={{ fontFamily: "var(--fontFamily)" }}>Shop (Coming Soon!)</h2>;
}

function SettingsPage() {
  return <h2 style={{ fontFamily: "var(--fontFamily)" }}>Settings (Coming Soon!)</h2>;
}

function NavBar({ isLoggedIn, onLoginToggle }) {
  const linkStyle = {
    fontSize: "1.2rem",
    color: "var(--fontColor)",
    textDecoration: "none",
    backgroundColor: "var(--buttonBg)",
    border: "4px solid var(--buttonBorder)",
    padding: "0.5rem 1rem",
    borderRadius: "12px",
    boxShadow: "0 4px #999",
    transition: "transform 0.2s ease"
  };

  const handleHover = (e, scale) => {
    e.currentTarget.style.transform = scale;
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#2a2a2a",
        borderBottom: "4px solid var(--buttonBorder)",
        padding: "1rem 2rem",
        boxShadow: "0 4px #000",
        fontFamily: "var(--fontFamily)"
      }}
    >
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link
          to="/"
          style={linkStyle}
          onMouseOver={(e) => handleHover(e, "scale(1.05)")}
          onMouseOut={(e) => handleHover(e, "scale(1.0)")}
        >To-Do Hero</Link>
        <Link
          to="/shop"
          style={linkStyle}
          onMouseOver={(e) => handleHover(e, "scale(1.05)")}
          onMouseOut={(e) => handleHover(e, "scale(1.0)")}
        >Shop</Link>
        <Link
          to="/settings"
          style={linkStyle}
          onMouseOver={(e) => handleHover(e, "scale(1.05)")}
          onMouseOut={(e) => handleHover(e, "scale(1.0)")}
        >Settings</Link>
      </div>
      <div style={{ marginLeft: "2rem" }}>
        <span
          onClick={onLoginToggle}
          style={{
            fontSize: "1.2rem",
            cursor: "pointer",
            backgroundColor: "var(--buttonBg)",
            border: "4px solid var(--buttonBorder)",
            padding: "0.5rem 1rem",
            borderRadius: "12px",
            boxShadow: "0 4px #999",
            transition: "transform 0.2s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1.0)"}
        >
          {isLoggedIn ? "Account" : "Login"}
        </span>
      </div>
    </nav>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    applyTheme(theme);
  }, []);

  return (
    <Router>
      <div
        style={{
          backgroundColor: "var(--backgroundColor)",
          color: "var(--fontColor)",
          minHeight: "100vh",
          fontFamily: "var(--fontFamily)",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <NavBar isLoggedIn={isLoggedIn} onLoginToggle={() => setIsLoggedIn(!isLoggedIn)} />
        <main
          style={{
            padding: "2rem",
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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
