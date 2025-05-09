import React, { createContext, useContext } from "react";

const ThemeContext = createContext("light");

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
