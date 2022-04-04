import React from "react";
import Grid from "../Grid";
import Sidebar from "../Sidebar";
import StyledMain from "./Main.styled";

export default function Main() {
	return (
		<StyledMain>
			<Sidebar />
			<Grid />
		</StyledMain>
	);
}
