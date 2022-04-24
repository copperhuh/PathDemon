import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import AlgoModalStyled from "./AlgoModal.styles";
import { MenuItem, Select } from "@mui/material";
import { connect } from "react-redux";

function AlgoModal({ open, setOpen, mazeType, searchType }) {
	const outside = useRef(null);

	const [mainSection, setMainSection] = useState("mazes");
	const [maze, setMaze] = useState(mazeType);
	const [search, setSearch] = useState(searchType);

	useEffect(() => {
		setMaze(mazeType);
	}, [mazeType]);

	useEffect(() => {
		setSearch(searchType);
	}, [searchType]);

	function onClose(e) {
		if (outside.current === e.target) {
			console.log("c");
			setOpen(false);
		}
	}

	const handleChange = (e) => {
		if (e.target.name === "maze") {
			setMaze(e.target.value);
		} else {
			setSearch(e.target.value);
		}
	};

	let description;
	if (mainSection === "mazes") {
		switch (maze) {
			case "MAZES":
				description = <></>;
				break;
			case "DFS":
				description = <></>;
				break;
			case "Kruskal":
				description = <></>;
				break;
			case "Prim":
				description = <></>;
				break;
			case "Recursive":
				description = <></>;
				break;
			case "Aldous-Broder":
				description = <></>;
				break;
			case "Wilson":
				description = <></>;
				break;
			default:
				description = <></>;
		}
	} else {
		switch (search) {
			case "SEARCHES":
				description = <></>;
				break;
			case "A*":
				description = <></>;
				break;
			case "Dijkstra":
				description = <></>;
				break;
			case "Greedy":
				description = <></>;
				break;
			case "Depth First":
				description = <></>;
				break;
			case "Breadth First":
				description = <></>;
				break;
			default:
				description = <></>;
		}
	}

	return ReactDOM.createPortal(
		<AnimatePresence>
			{open && (
				<AlgoModalStyled ref={outside} onClick={onClose}>
					<motion.div
						animate={{ y: 0 }}
						initial={{ y: "-50vh" }}
						exit={{ y: "-100vh" }}
						transition={{ ease: "easeOut", duration: 0.1 }}
						className="modal-bg"
					>
						<div className="main-btns">
							<button
								className={`main-btn ${
									mainSection === "mazes"
										? "current-main"
										: null
								}`}
								onClick={() => setMainSection("mazes")}
							>
								MAZES
							</button>
							<button
								className={`main-btn ${
									mainSection === "searches"
										? "current-main"
										: null
								}`}
								onClick={() => setMainSection("searches")}
							>
								SEARCHES
							</button>
						</div>
						<div className="content">
							{mainSection === "mazes" ? (
								<Select
									labelId="select-label"
									className="select"
									value={maze}
									name={"maze"}
									onChange={handleChange}
								>
									<MenuItem value={"MAZES"}>MAZES</MenuItem>
									<MenuItem value={"DFS"}>DFS</MenuItem>
									<MenuItem value={"Kruskal"}>
										Kruskal
									</MenuItem>
									<MenuItem value={"Prim"}>Prim</MenuItem>
									<MenuItem value={"Recursive"}>
										Recursive
									</MenuItem>
									<MenuItem value={"Aldous-Broder"}>
										Aldous-Broder
									</MenuItem>
									<MenuItem value={"Wilson"}>Wilson</MenuItem>
								</Select>
							) : (
								<Select
									className="select"
									value={search}
									name={"search"}
									onChange={handleChange}
								>
									<MenuItem value={"SEARCHES"}>
										SEARCHES
									</MenuItem>
									<MenuItem value={"A*"}>A*</MenuItem>
									<MenuItem value={"Dijkstra"}>
										Dijkstra
									</MenuItem>
									<MenuItem value={"Greedy"}>Greedy</MenuItem>
									<MenuItem value={"Depth First"}>
										Depth First
									</MenuItem>
									<MenuItem value={"Breadth First"}>
										Breadth First
									</MenuItem>
								</Select>
							)}
							{description}
							<button
								onClick={() => setOpen(false)}
								className="close-modal"
							>
								<CloseIcon sx={{ fontSize: "2.7rem" }} />
							</button>
						</div>
					</motion.div>
				</AlgoModalStyled>
			)}
		</AnimatePresence>,
		document.getElementById("portal")
	);
}

const Props = (state) => ({
	mazeType: state.mazeType,
	searchType: state.searchType,
});

export default connect(Props, null)(AlgoModal);
