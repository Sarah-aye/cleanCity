"use client";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { Button } from "react-bootstrap";

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <Button
      variant={theme === "dark" ? "outline-light" : "outline-dark"}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </Button>
  );
}
