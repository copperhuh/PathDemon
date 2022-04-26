import styled from "styled-components";

const StyledMain = styled.div`
	display: flex;
	height: fit-content;
	width: 100%;
	min-height: 90vh;
	/* position: relative; */
	.open-sidebar {
		height: fit-content;
		position: absolute;
		/* top: 22vh; */
		/* left: 1rem; */
		padding: 0.3rem 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: ${(props) => props.theme.colors.primary};
		color: ${(props) => props.theme.colors.light};
		border: 1px solid ${(props) => props.theme.colors.light};
		border-left: none;
		:hover {
			background: ${(props) => props.theme.colors.light};
			color: ${(props) => props.theme.colors.primary};
			border: 1px solid ${(props) => props.theme.colors.primary};
			float: left;
		}
	}
`;

export default StyledMain;
