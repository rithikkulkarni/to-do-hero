import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ isLoggedIn, onLogout, theme }) {

  const navLinks = [
    { to: "/", label: "📝 To-Do Hero" },
    { to: "/shop", label: "🛍️ Shop" },
    { to: "/settings", label: "⚙️ Settings" }
  ];

  const buttonStyle = {
    fontSize: "1.2rem",
    fontFamily: theme.fontFamily,
    color: theme.navFontColor,
    background: theme.buttonImage ? `url(${theme.buttonImage})` : theme.buttonBg,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    border: theme.buttonImage ? "none" : `4px solid ${theme.buttonBorder}`,
    padding: "0.5rem 1rem",
    borderRadius: "0px",
    boxShadow: "0 4px #999",
    transition: "transform 0.2s ease",
    imageRendering: "pixelated",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none"
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "1rem 2rem",
        fontFamily: theme.fontFamily
      }}
    >
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={buttonStyle}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div style={{ marginLeft: "2rem" }}>
        {isLoggedIn ? (
          <button
            onClick={onLogout}
            style={buttonStyle}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          >
            🚪 Sign Out
          </button>
        ) : (
          <Link
            to="/login"
            style={buttonStyle}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          >
            🔑 Login
          </Link>
        )}
      </div>
    </nav>
  );
}
