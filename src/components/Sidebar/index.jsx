import React, { useState } from "react";
import StyledSidebar from "./Sidebar.styled";
import Slider from "@mui/material/Slider";

export default function Sidebar({
	size,
	setSize,
	appState,
	setAppState,
	delayRef,
}) {
	const handleChange = (e) => {
		if (e.target.name === "size") {
			setSize(e.target.value);
			return;
		}
		setAppState((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const [delay, setDelay] = useState(30);
	const handleDelayChange = (e) => {
		setDelay(e.target.value);
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
			<div className="sidebar-element">
				DELAY
				<Slider
					ref={delayRef}
					className="slider"
					name="delay"
					defaultValue={10}
					value={delay}
					onChange={handleDelayChange}
					min={0}
					max={500}
					valueLabelDisplay="auto"
					aria-label="delay"
				/>
			</div>
			<div className="sidebar-element">
				<button
					onClick={() =>
						setAppState((prevState) => ({
							...prevState,
							started: !prevState.started,
						}))
					}
				>
					GENERATE MAZE
				</button>
			</div>
		</StyledSidebar>
	);
}
