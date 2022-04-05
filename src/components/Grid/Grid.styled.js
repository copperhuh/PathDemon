import styled from "styled-components";

const StyledGrid = styled.div`
	flex: 1;
	background: ${(props) => props.theme.colors.secondary};
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem 3rem;
	height: 100%;
	.flex-container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
	}
	.container {
		overflow: hidden;
		display: grid;
		grid-template-columns: repeat(
			${(props) => props.gridDimensions.cols},
			${(props) => (props.size * 8) / 10}px
		);
		grid-template-rows: repeat(
			${(props) => props.gridDimensions.rows},
			${(props) => (props.size * 8) / 10}px
		);
		gap: ${(props) => (props.size * 2) / 10}px;
		justify-content: center;
		align-content: center;
		height: 100%;
		width: 100%;
	}
	.node {
		/* width: ${(props) => (props.size * 8) / 10}px;
		height: ${(props) => (props.size * 8) / 10}px;
		margin: ${(props) => (props.size * 1) / 10}px; */
		border-radius: 10%;
	}
`;

export default StyledGrid;
