import { ThemeProvider } from "styled-components";
import React from "react";

const theme = {
	colors: {
		accent: "#48846b",
		primary: "#242625",
		secondary: "#1d1f1e",
		tertiary: "#1a1c1b",
		light: "#d4d0c1",
	},
	fonts: { main: "'Montserrat', sans-serif" },
};

const Theme = ({ children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
