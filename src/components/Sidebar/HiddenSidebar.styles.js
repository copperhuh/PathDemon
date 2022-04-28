import styled from "styled-components";

const HiddenSidebarStyled = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0.3);
	display: flex;
	.sidebar-bg {
		height: 100%;
		width: fit-content;
		overflow: auto;
		overflow-x: hidden;
		background: ${(props) => props.theme.colors.primary};
		position: relative;
		display: flex;
		opacity: 1 !important;
	}
	.close-sidebar {
		height: fit-content;
		position: absolute;
		top: 1.5rem;
		right: 0.5rem;
		width: fit-content;
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		color: ${(props) => props.theme.colors.light};
		border: none;
		:hover {
			transform: scale(1.3);
		}
	}
	&::-webkit-scrollbar {
		width: 10px;
	}
	&::-webkit-scrollbar-track {
		background: ${(props) => props.theme.colors.dark};
	}
	&::-webkit-scrollbar-thumb {
		width: 5px;
		background: ${(props) => props.theme.colors.main};
		border-radius: 5px;
	}
`;

export default HiddenSidebarStyled;
