import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar({ isLoggedIn, onLogout }) {
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