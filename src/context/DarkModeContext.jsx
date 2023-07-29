import { createContext, useContext } from "react";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

	const toggleDarkMode = () => {
		setIsDarkMode((isDark) => !isDark);
	};

	return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
};

const useDarkMode = () => {
	const context = useContext(DarkModeContext);
	if (context === undefined) {
		throw new Error("DarkModeContext was used outside of DarkModeProvider");
	}

	return context;
};

export { DarkModeProvider, useDarkMode };