import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

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

function PixelButton({ children, onClick }) {
  const handleClick = () => {
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
        borderRadius: "0px",
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

function TodoList() {
  const [duration, setDuration] = useState("15");
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() && duration) {
      const startTime = Date.now();
      const endTime = startTime + parseInt(duration) * 60 * 1000;
      const newTask = {
        text: input.trim(),
        duration,
        completed: false,
        endTime
      };
      setTasks([...tasks, newTask]);
      setInput("");
      setDuration("15");
    }
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
    setTimeout(() => {
      setTasks((prev) => prev.filter((_, i) => i !== index));
    }, 500);
  };

  const getTimeRemaining = (endTime) => {
    const remaining = endTime - Date.now();
    return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTasks((prevTasks) => [...prevTasks]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#2a2a2a",
        padding: "1rem",
        borderRadius: "0px",
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
          padding: "0.5rem 1.5rem",
          margin: "0.5rem",
          cursor: "pointer",
          backgroundColor: "var(--buttonBg)",
          border: "4px solid var(--buttonBorder)",
          color: "var(--fontColor)",
          borderRadius: "0px",
          boxShadow: "0 4px #999",
          fontSize: "1rem",
          transition: "transform 0.2s ease",
          marginRight: "0.5rem"
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
      />
      <select
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        style={{
          fontFamily: "var(--fontFamily)",
          padding: "0.5rem 1.5rem",
          margin: "0.5rem",
          cursor: "pointer",
          backgroundColor: "var(--buttonBg)",
          border: "4px solid var(--buttonBorder)",
          color: "var(--fontColor)",
          borderRadius: "0px",
          boxShadow: "0 4px #999",
          fontSize: "1rem",
          transition: "transform 0.2s ease",
          marginRight: "0.5rem"
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
      >
        <option value="15">15 minutes</option>
        <option value="30">30 minutes</option>
        <option value="45">45 minutes</option>
        <option value="60">1 hour</option>
      </select>

      <PixelButton onClick={addTask}>Add</PixelButton>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {tasks.map((task, index) => {
          const remaining = getTimeRemaining(task.endTime);
          const canComplete = remaining === 0;

          return (
            <li
              key={index}
              style={{
                fontFamily: "var(--fontFamily)",
                color: "var(--fontColor)",
                marginTop: "0.5rem",
                backgroundColor: task.completed ? "#222" : "#444",
                padding: "0.5rem 1rem",
                borderRadius: "0px",
                border: "2px solid var(--buttonBorder)",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "1rem",
                opacity: task.completed ? 0.3 : 1,
                transition: "all 0.5s ease"
              }}
            >
              <input
                type="checkbox"
                onChange={() => canComplete && completeTask(index)}
                checked={task.completed}
                disabled={!canComplete}
                style={{
                  transform: "scale(1.2)",
                  cursor: canComplete ? "pointer" : "not-allowed",
                  appearance: "none",
                  width: "20px",
                  height: "20px",
                  backgroundColor: "var(--buttonBg)",
                  border: "4px solid var(--buttonBorder)",
                  borderRadius: "0px",
                  outline: "none",
                  boxShadow: "0 2px #999"
                }}
              />
              <span>
                {task.text} ({task.duration} mins)
                {!canComplete && (
                  <span style={{ marginLeft: "0.5rem", color: "#ffcc00" }}>
                    ⏳ {Math.floor(remaining / 60)}:{("0" + (remaining % 60)).slice(-2)}
                  </span>
                )}
              </span>
            </li>
          );
        })}
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

function LoginPage({ onLogin }) {
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

function NavBar({ isLoggedIn, onLogout }) {
  const location = useLocation();

  const linkStyle = {
    fontSize: "1.2rem",
    color: "var(--fontColor)",
    textDecoration: "none",
    backgroundColor: "var(--buttonBg)",
    border: "4px solid var(--buttonBorder)",
    padding: "0.5rem 1rem",
    borderRadius: "0px",
    boxShadow: "0 4px #999",
    transition: "transform 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem"
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
        <Link to="/" style={linkStyle} onMouseOver={(e) => handleHover(e, "scale(1.05)")} onMouseOut={(e) => handleHover(e, "scale(1.0)")}>📝 To-Do Hero</Link>
        <Link to="/shop" style={linkStyle} onMouseOver={(e) => handleHover(e, "scale(1.05)")} onMouseOut={(e) => handleHover(e, "scale(1.0)")}>🛍️ Shop</Link>
        <Link to="/settings" style={linkStyle} onMouseOver={(e) => handleHover(e, "scale(1.05)")} onMouseOut={(e) => handleHover(e, "scale(1.0)")}>⚙️ Settings</Link>
      </div>
      <div style={{ marginLeft: "2rem" }}>
        {isLoggedIn ? (
          <button
            onClick={onLogout}
            style={linkStyle}
            onMouseOver={(e) => handleHover(e, "scale(1.05)")}
            onMouseOut={(e) => handleHover(e, "scale(1.0)")}
          >
            🚪 Sign Out
          </button>
        ) : (
          <Link
            to="/login"
            style={linkStyle}
            onMouseOver={(e) => handleHover(e, "scale(1.05)")}
            onMouseOut={(e) => handleHover(e, "scale(1.0)")}
          >
            🔑 Login
          </Link>
        )}
      </div>
    </nav>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
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
            <Route path="/login" element={<LoginPage onLogin={setIsLoggedIn} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
