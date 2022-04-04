import { ThemeProvider } from "styled-components";
import React from "react";

const theme = {
	colors: {
		accent: "#48846b",
		primary: "#242625",
		secondary: "#1d1f1e",
		tertiary: "#1a1c1b",
	},
	fonts: { main: "'Syncopate', sans-serif" },
};

const Theme = ({ children, variation }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
