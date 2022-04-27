import React from "react";
import { connect } from "react-redux";
import useAlgo from "../../hooks/useAlgo";
import StyledGrid from "./Grid.styled";

function Grid({ width, size, dimensions, mainRef }) {
	const elements = useAlgo(mainRef.current);

	return (
		<StyledGrid width={width} size={size} gridDimensions={dimensions}>
			<div ref={mainRef} className="flex-container">
				<div className="container">{elements}</div>
			</div>
		</StyledGrid>
	);
}

const Props = (state) => ({
	size: state.size,
	dimensions: state.dimensions,
});

export default connect(Props, null)(Grid);
