import React, { useState } from "react";
import StyledSidebar from "./Sidebar.styled";
import Slider from "@mui/material/Slider";

export default function Sidebar({ size, setAppState }) {
	const [localSize, setLocalSize] = useState(size);

	const handleChange = (e) => {
		setAppState((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	return (
		<StyledSidebar>
			<div className="sidebar-element">
				GRID SIZE
				<Slider
					className="slider"
					name="size"
					defaultValue={10}
					value={size}
					onChange={handleChange}
					step={1}
					min={10}
					max={60}
					valueLabelDisplay="auto"
					aria-label="size"
				/>
			</div>
		</StyledSidebar>
	);
}
