import React, { useState, useEffect, useState as useButtonState } from "react";
import theme from "./theme";

export default function TodoList() {
  const [duration, setDuration] = useState("15");
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [buttonState, setButtonState] = useButtonState("still");

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

  const getButtonImage = () => {
    switch (buttonState) {
      case "pressed":
        return "themes/default/add-button-full-pressed.png";
      case "half":
        return "themes/default/add-button-half-pressed.png";
      default:
        return "themes/default/add-button-unpressed.png";
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#2a2a2a",
        padding: "1rem",
        borderRadius: "0px",
        border: "4px solid var(--buttonBorder)",
        boxShadow: "0 6px #000",
        width: "33.33vw",
        maxWidth: "1000px",
        minWidth: "600px",
        margin: "0 auto"
      }}
    >
      <h2 style={{ fontFamily: "var(--fontFamily)", marginBottom: "1rem" }}>To-Do List</h2>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            fontFamily: "var(--fontFamily)",
            padding: "0.5rem 0.5rem",
            margin: "0.5rem",
            cursor: "pointer",
            backgroundColor: "var(--buttonBg)",
            border: "4px solid var(--buttonBorder)",
            color: "var(--fontColor)",
            borderRadius: "0px",
            boxShadow: "0 4px #999",
            fontSize: "1rem",
            transition: "transform 0.2s ease",
            marginRight: "0.5rem",
            flex: 1
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
        />
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{
            fontFamily: "var(--fontFamily)",
            padding: "0.5rem 0.5rem",
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
        <button
          onClick={addTask}
          onMouseDown={() => setButtonState("half")}
          onMouseUp={() => {
            setButtonState("pressed");
            setTimeout(() => setButtonState("still"), 150);
          }}
          style={{
            width: "48px",
            height: "39px",
            backgroundImage: `url(${getButtonImage()})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            imageRendering: "pixelated",
            border: "none",
            cursor: "pointer"
          }}
        ></button>
      </div>
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
                padding: "0.5rem 0.5rem",
                borderRadius: "0px",
                border: "2px solid var(--buttonBorder)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                opacity: task.completed ? 0.3 : 1,
                transition: "all 0.5s ease",
                overflowWrap: "anywhere"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1 }}>
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
                    boxShadow: "0 2px #999",
                    flexShrink: 0
                  }}
                />
                <span style={{ wordBreak: "break-word" }}>{task.text}</span>
              </div>
              {!canComplete && (
                <span style={{ color: "#ffcc00", minWidth: "65px", textAlign: "right" }}>
                  ⌛ {Math.floor(remaining / 60)}:{("0" + (remaining % 60)).slice(-2)}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
