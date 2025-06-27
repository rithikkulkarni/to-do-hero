export default function PixelButton({ children, onClick }) {
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
        padding: "0.04rem 0.5rem",
        margin: "0.5rem",
        cursor: "pointer",
        borderRadius: "0px",
        boxShadow: "0 4px #999",
        fontSize: "1.75rem",
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