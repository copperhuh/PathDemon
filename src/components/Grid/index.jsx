import React from "react";
import useAlgo from "../../hooks/useAlgo";
import StyledGrid from "./Grid.styled";

export default function Grid({ size, gridDimensions, mainRef }) {
	const elements = useAlgo(
		gridDimensions.rows * gridDimensions.cols,
		mainRef.current,
		size,
		gridDimensions.cols,
		gridDimensions.rows
	);
	return (
		<StyledGrid size={size} gridDimensions={gridDimensions}>
			<div ref={mainRef} className="flex-container">
				<div className="container">{elements}</div>
			</div>
		</StyledGrid>
	);
}
