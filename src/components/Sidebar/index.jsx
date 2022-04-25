import React, { useEffect, useRef, useState } from "react";
import StyledSidebar from "./Sidebar.styled";
import Slider from "@mui/material/Slider";
import {
	doChangeSize,
	doSetGenerating,
	doSetPathVisible,
	doSetSkip,
	doSetVisualizationOngoing,
	doSetReset,
	doChangeMazeType,
	doChangeSearchType,
	doChangeDelay,
} from "../../redux/Actions";
import { connect } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AlgoModal from "./AlgoModal";

function Sidebar({
	visualizationOngoing,
	setVisualizationOngoing,
	setGenerating,
	setPathVisible,
	setSkip,
	setReset,
	reset,
	changeSize,
	changeDelay,
	changeMazeType,
	changeSearchType,
	hiddenSidebarSetOpen,
	size,
	delay,
	mazeType,
	searchType,
}) {
	const [settings, setSettings] = useState({
		size,
		delay,
		mazeType,
		searchType,
	});
	const [algoModalOpen, setAlgoModalOpen] = useState(false);

	const handleChange = (e) => {
		setSettings((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
		if (e.target.name === "size") {
			changeSize(e.target.value);
		} else if (e.target.name === "delay") {
			changeDelay(e.target.value);
		} else if (e.target.name === "mazeType") {
			changeMazeType(e.target.value);
		} else if (e.target.name === "searchType") {
			changeSearchType(e.target.value);
		}
	};

	const handleGenerate = (mode) => {
		if (hiddenSidebarSetOpen !== false) hiddenSidebarSetOpen(false);
		setVisualizationOngoing(true);
		setGenerating(mode);
		setPathVisible(false);
	};

	return (
		<StyledSidebar>
			<div className="sidebar-section">
				<div className="sidebar-element">
					GRID SIZE
					<Slider
						disabled={visualizationOngoing}
						className="slider"
						name="size"
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
						className="slider"
						name="delay"
						value={settings.delay}
						onChange={handleChange}
						min={0}
						max={500}
						valueLabelDisplay="auto"
						aria-label="delay"
					/>
				</div>
			</div>
			<div className="sidebar-section">
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
			</div>
			<div className="sidebar-section">
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
							<MenuItem value={"Depth First"}>
								Depth First
							</MenuItem>
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
			</div>
			<div className="sidebar-section">
				<div className="sidebar-element">
					<button
						value={false}
						disabled={!visualizationOngoing}
						onClick={() => {
							setSkip(true);
							if (hiddenSidebarSetOpen !== false)
								hiddenSidebarSetOpen(false);
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
							if (hiddenSidebarSetOpen !== false)
								hiddenSidebarSetOpen(false);
						}}
					>
						CLEAR GRID
					</button>
				</div>
				<div className="sidebar-element">
					<button
						className="large"
						onClick={() => setAlgoModalOpen(true)}
					>
						ALGORITHM <span>INFO</span>
					</button>
				</div>
			</div>
			<AlgoModal open={algoModalOpen} setOpen={setAlgoModalOpen} />
		</StyledSidebar>
	);
}

const Actions = (dispatch) => ({
	changeSize: (size) => dispatch(doChangeSize(size)),
	changeDelay: (delay) => dispatch(doChangeDelay(delay)),
	setGenerating: (generating) => dispatch(doSetGenerating(generating)),
	setPathVisible: (bool) => dispatch(doSetPathVisible(bool)),
	setSkip: (bool) => dispatch(doSetSkip(bool)),
	setReset: (bool) => dispatch(doSetReset(bool)),
	changeMazeType: (mazeType) => dispatch(doChangeMazeType(mazeType)),
	changeSearchType: (searchType) => dispatch(doChangeSearchType(searchType)),
	setVisualizationOngoing: (visualizationOngoing) =>
		dispatch(doSetVisualizationOngoing(visualizationOngoing)),
});

const Props = (state) => ({
	visualizationOngoing: state.visualizationOngoing,
	reset: state.reset,
	mazeType: state.mazeType,
	searchType: state.searchType,
	size: state.size,
	delay: state.delay,
});

export default connect(Props, Actions)(Sidebar);
