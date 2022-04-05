import React from "react";
import useAlgo from "../../hooks/useAlgo";
import StyledGrid from "./Grid.styled";
import Node from "./Node";

export default function Grid({ size, gridDimensions, mainRef }) {
	const elements = useAlgo(gridDimensions.rows * gridDimensions.cols);
	return (
		<StyledGrid size={size} gridDimensions={gridDimensions}>
			<div ref={mainRef} className="flex-container">
				<div className="container">
					{elements.map((el, idx) => (
						<Node look={el} key={idx} />
					))}
				</div>
			</div>
		</StyledGrid>
	);
}
