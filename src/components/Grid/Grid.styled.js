import styled from "styled-components";

const StyledGrid = styled.div`
	width: calc(100% - 15rem);
	background: ${(props) => props.theme.colors.secondary};
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem 3rem;
	height: 100%;
	.flex-container {
		display: flex;
		/* align-items: center; */
		/* justify-content: center; */
		height: ${(props) => props.gridDimensions.rows * props.size}px;
		height: 100%;
		width: 100%;
	}
	.container {
		display: grid;
		grid-template-columns: repeat(
			${(props) => props.gridDimensions.cols},
			${(props) => (props.size * 10) / 10}px
		);
		grid-template-rows: repeat(
			${(props) => props.gridDimensions.rows},
			${(props) => (props.size * 10) / 10}px
		);
		gap: 0;
		height: 100%;
		width: 100%;
	}
	.node {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.node-coloured {
		height: ${(props) => (props.size * 8) / 10}px;
		width: ${(props) => (props.size * 8) / 10}px;
		margin: ${(props) => (props.size * 1) / 10}px;
		border-radius: 10%;
		font-size: 10px;
	}
	.empty {
		background: ${(props) => props.theme.colors.light};
	}
	.wall {
		background: #39423f;
		/* background: ${(props) => props.theme.colors.secondary}; */
	}
	.queued {
		background: ${(props) => props.theme.colors.accent};
	}
`;

export default StyledGrid;
