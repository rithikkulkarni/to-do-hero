import React from "react";

export default function PixelButton({ children, onClick, theme }) {
  const handleClick = () => {
    if (onClick) onClick();
  };

  const buttonStyle = {
    width: "50px",
    height: "50px",
    backgroundImage: `url(${theme.buttonImage})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    border: "none",
    color: theme.fontColor || "#fff",
    fontFamily: theme.fontFamily || "sans-serif",
    fontSize: "1.5rem",
    textAlign: "center",
    cursor: "pointer",
    padding: 0,
    margin: "0.5rem",
    outline: "none",
    imageRendering: "pixelated"
  };

  return (
    <button
      onClick={handleClick}
      style={buttonStyle}
    >
      {children}
    </button>
  );
}
