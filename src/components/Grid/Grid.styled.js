import styled from "styled-components";

const StyledGrid = styled.div`
	width: calc(100% - 15rem);
	background: ${(props) => props.theme.colors.secondary};
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2.5rem 4rem;
	height: 100%;
	color: ${(props) => props.theme.colors.light};
	> * {
		user-select: none;
	}
	.flex-container {
		display: flex;
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
		/* height: 100%; */
		/* width: 100%; */
	}
	.node {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.node-coloured {
		height: ${(props) => (props.size * 8.5) / 10}px;
		width: ${(props) => (props.size * 8.5) / 10}px;
		margin: ${(props) => (props.size * 0.5) / 10}px;
		border-radius: 10%;
		font-size: 10px;
		transition: all 0.1s;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.empty,
	.start-transition,
	.target-transition {
		background: ${(props) => props.theme.colors.light};
		color: black;
	}

	.wall {
		background: #39423f;
	}
	.queued {
		background: ${(props) => props.theme.colors.accent};
	}
	.visited {
		background: #bd9f5c;
	}
	.path {
		background: #664870;
	}
	.start {
		background: #664870;
		cursor: grab;
	}
	.target {
		background: #664870;
		cursor: grab;
	}
`;

export default StyledGrid;
