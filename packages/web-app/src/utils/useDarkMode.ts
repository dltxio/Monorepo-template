/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

export const useDarkMode = (
  usePreferences: boolean
): [
  Mode,
  React.Dispatch<React.SetStateAction<Mode>> | null,
  (() => void) | null
] => {
  const [mode, setMode] = useState<Mode>(null);
  if (!usePreferences) {
    return [null, null, null];
  }

  const toggleMode = () => {
    if (mode === "light") {
      document.documentElement.className = "";
      document.documentElement.classList.add("dark");
      setMode("dark");
    } else {
      document.documentElement.className = "";
      document.documentElement.classList.add("light");
      setMode("light");
    }
  };

  useEffect(() => {
    const userPreference =
      Boolean(window.matchMedia) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    setMode(
      // Use stored theme; fallback to user preference
      window.localStorage.getItem("theme") ??
        (userPreference ? "dark" : "light")
    );
  }, []);

  useEffect(() => {
    if (mode) {
      window.localStorage.setItem("theme", mode);
      document.documentElement.classList.add(mode);
    }
  }, [mode]);

  return [mode, setMode, toggleMode];
};

export default useDarkMode;
