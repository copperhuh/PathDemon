import React, { useEffect, useRef, useState } from "react";
import StyledSidebar from "./Sidebar.styled";
import Slider from "@mui/material/Slider";
import {
	doChangeSize,
	doSetDelayRef,
	doSetGenerating,
	doSetPathVisible,
	doSetSkipRef,
	doSetVisualizationOngoing,
	doSetReset,
} from "../../redux/Actions";
import { connect } from "react-redux";

function Sidebar({
	visualizationOngoing,
	skip,
	setVisualizationOngoing,
	setDelayRef,
	setGenerating,
	setPathVisible,
	setSkipRef,
	setReset,
	reset,
	changeSize,
}) {
	const [settings, setSettings] = useState({
		size: 50,
		delay: 50,
	});

	const delayRef = useRef(null);
	const skipRef = useRef(null);

	useEffect(() => {
		setDelayRef(delayRef);
	}, [delayRef]);

	useEffect(() => {
		setSkipRef(skipRef);
	}, [skipRef]);

	const handleChange = (e) => {
		setSettings((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
		if (e.target.name === "size") {
			changeSize(e.target.value);
		}
	};

	const handleGenerate = (mode) => {
		setVisualizationOngoing(true);
		setGenerating(mode);
		setPathVisible(false);
	};

	return (
		<StyledSidebar>
			<div className="sidebar-element">
				GRID SIZE
				<Slider
					disabled={visualizationOngoing}
					className="slider"
					name="size"
					defaultValue={30}
					value={settings.size}
					onChange={handleChange}
					step={1}
					min={10}
					max={70}
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
					defaultValue={50}
					value={settings.delay}
					onChange={handleChange}
					min={0}
					max={500}
					valueLabelDisplay="auto"
					aria-label="delay"
				/>
			</div>
			<div className="sidebar-element">
				<button
					disabled={visualizationOngoing}
					onClick={() => {
						handleGenerate("maze");
					}}
				>
					GENERATE MAZE
				</button>
			</div>
			<div className="sidebar-element">
				<button
					disabled={visualizationOngoing}
					onClick={() => {
						handleGenerate("path");
					}}
				>
					GENERATE PATH
				</button>
			</div>
			<div className="sidebar-element">
				<button
					ref={skipRef}
					value={false}
					disabled={!visualizationOngoing}
					onClick={() => {
						skipRef.current.value = true;
					}}
				>
					SKIP
				</button>
			</div>
			<div className="sidebar-element">
				<button
					value={reset}
					onClick={() => {
						setReset(true);
					}}
				>
					CLEAR GRID
				</button>
			</div>
		</StyledSidebar>
	);
}

const Actions = (dispatch) => ({
	changeSize: (size) => dispatch(doChangeSize(size)),
	setDelayRef: (sortType) => dispatch(doSetDelayRef(sortType)),
	setGenerating: (generating) => dispatch(doSetGenerating(generating)),
	setPathVisible: (bool) => dispatch(doSetPathVisible(bool)),
	setSkipRef: (bool) => dispatch(doSetSkipRef(bool)),
	setReset: (bool) => dispatch(doSetReset(bool)),
	setVisualizationOngoing: (visualizationOngoing) =>
		dispatch(doSetVisualizationOngoing(visualizationOngoing)),
});

const Props = (state) => ({
	visualizationOngoing: state.visualizationOngoing,
	reset: state.reset,
});

export default connect(Props, Actions)(Sidebar);
