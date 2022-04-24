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
	doChangeMazeType,
	doChangeSearchType,
} from "../../redux/Actions";
import { connect } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
	changeMazeType,
	changeSearchType,
}) {
	const [settings, setSettings] = useState({
		size: 50,
		delay: 50,
		mazeType: "DFS",
		searchType: "A*",
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
		} else if (e.target.name === "mazeType") {
			changeMazeType(e.target.value);
		} else if (e.target.name === "searchType") {
			changeSearchType(e.target.value);
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
				<FormControl fullWidth>
					<InputLabel className="label" id="select-label">
						MAZE ALGORITHM
					</InputLabel>
					<Select
						labelId="select-label"
						className="select"
						value={settings.mazeType}
						name={"mazeType"}
						onChange={handleChange}
					>
						<MenuItem value={"DFS"}>DFS</MenuItem>
						<MenuItem value={"Kruskal"}>Kruskal</MenuItem>
						<MenuItem value={"Prim"}>Prim</MenuItem>
						<MenuItem value={"Recursive"}>Recursive</MenuItem>
						<MenuItem value={"Aldous-Broder"}>
							Aldous-Broder
						</MenuItem>
						<MenuItem value={"Wilson"}>Wilson</MenuItem>
					</Select>
				</FormControl>
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
				<FormControl fullWidth>
					<InputLabel className="label" id="select-label">
						SEARCH ALGORITHM
					</InputLabel>
					<Select
						labelId="select-label"
						className="select"
						value={settings.searchType}
						name={"searchType"}
						onChange={handleChange}
					>
						<MenuItem value={"A*"}>A*</MenuItem>
						<MenuItem value={"Dijkstra"}>Dijkstra</MenuItem>
						<MenuItem value={"Greedy"}>Greedy</MenuItem>
						<MenuItem value={"Depth First"}>Depth First</MenuItem>
						<MenuItem value={"Breadth First"}>
							Breadth First
						</MenuItem>
					</Select>
				</FormControl>
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
	changeMazeType: (mazeType) => dispatch(doChangeMazeType(mazeType)),
	changeSearchType: (searchType) => dispatch(doChangeSearchType(searchType)),
	setVisualizationOngoing: (visualizationOngoing) =>
		dispatch(doSetVisualizationOngoing(visualizationOngoing)),
});

const Props = (state) => ({
	visualizationOngoing: state.visualizationOngoing,
	reset: state.reset,
});

export default connect(Props, Actions)(Sidebar);
