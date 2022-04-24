import React from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import InfoModalStyled from "./InfoModal.styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FlagIcon from "@mui/icons-material/Flag";
import { motion, AnimatePresence } from "framer-motion";

export default function InfoModal({ open, setOpen }) {
	const outside = React.useRef(null);

	function onClose(e) {
		if (outside.current === e.target) {
			console.log("c");
			setOpen(false);
		}
	}

	return ReactDOM.createPortal(
		<AnimatePresence>
			{open && (
				<InfoModalStyled ref={outside} onClick={onClose}>
					<motion.div
						animate={{ y: 0 }}
						initial={{ y: "-50vh" }}
						exit={{ y: "-100vh" }}
						transition={{ ease: "easeOut", duration: 0.1 }}
						className="modal-bg"
					>
						<button
							onClick={() => setOpen(false)}
							className="close-modal"
						>
							<CloseIcon sx={{ fontSize: "2.7rem" }} />
						</button>
						<h3>Grid Legend</h3>
						<div className="legend">
							<div className="legend-section">
								<div className="node start">
									<PlayArrowIcon
										sx={{ fontSize: "1.8rem" }}
									/>
								</div>
								start node
							</div>
							<div className="legend-section">
								<div className="node target">
									<FlagIcon sx={{ fontSize: "1.8rem" }} />
								</div>
								target node
							</div>
							<div className="legend-section">
								<div className="node empty"></div>unvisited node
							</div>
							<div className="legend-section">
								<div className="node wall"></div>wall node
							</div>
							<div className="legend-section">
								<div className="node visited"></div>visited node
							</div>
							<div className="legend-section">
								<div className="node queued"></div>queued node
							</div>
							<div className="legend-section">
								<div className="node path"></div>path node
							</div>
						</div>
					</motion.div>
				</InfoModalStyled>
			)}
		</AnimatePresence>,
		document.getElementById("portal")
	);
}
