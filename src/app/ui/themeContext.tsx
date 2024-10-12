"use client";

import { createContext, ReactNode, useState } from "react";

export const ThemeContext = createContext({
  theme: "#ccc",
  setTheme: (theme: string) => {},
});

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("#ccc"); // Initialize with red color
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
