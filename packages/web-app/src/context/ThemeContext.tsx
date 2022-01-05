import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";

export type ThemeValue = {
  theme: string | boolean | null;
};

/**
 * Saves the old theme for future use
 * @param {string} theme - Name of curent theme
 * @return {string} previousTheme
 */
function usePrevious(theme: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = theme;
  });
  return ref.current;
}

/**
 * Gets user preferences from local storage
 * @param {string} key - localStorage key
 * @return {array} getter and setter for user preferred theme
 */
function useStorageTheme(key: any) {
  const userPreference =
    Boolean(window.matchMedia) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useState(
    // Use stored theme; fallback to user preference
    localStorage.getItem(key) || userPreference
  );

  // Update stored theme
  useEffect(() => {
    localStorage.setItem(key, theme as any);
  }, [theme, key]);

  return [theme, setTheme] as const;
}

// Create context
export const ThemeContext = React.createContext<ThemeValue>({} as any);

// Create context provider
export const ThemeProvider = function ({ children }: any) {
  const [theme, setTheme] = useStorageTheme("theme");

  // Update root element class on theme change
  const oldTheme = usePrevious(theme);
  useLayoutEffect(() => {
    document.documentElement.classList.remove(`theme-${oldTheme}`);
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme, oldTheme]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  const value = useMemo(
    () => ({
      theme,
      toggleTheme
    }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
