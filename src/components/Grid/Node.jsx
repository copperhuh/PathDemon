import React, { useMemo } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FlagIcon from "@mui/icons-material/Flag";

function Node({ look, idx, bindSpecial, bind, size }) {
	const element = useMemo(() => {
		return (
			<>
				{look === "target" ||
				look === "start" ||
				look === "start-transition" ||
				look === "target-transition" ? (
					<div
						className="node"
						style={{ touchAction: "none" }}
						{...bindSpecial}
					>
						<div className={`node-coloured ${look}`}>
							{look === "start" || look === "start-transition" ? (
								<PlayArrowIcon
									sx={{ fontSize: (size * 6) / 10 }}
								/>
							) : look === "target" ||
							  look === "target-transition" ? (
								<FlagIcon sx={{ fontSize: (size * 6) / 10 }} />
							) : null}
						</div>
					</div>
				) : (
					<div
						className="node"
						style={{ touchAction: "none" }}
						{...bind}
					>
						<div className={`node-coloured ${look}`}></div>
					</div>
				)}
			</>
		);
	}, [look, bind, bindSpecial]);
	return <>{element}</>;
}

export default React.memo(Node);
