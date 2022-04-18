import styled from "styled-components";

const StyledSidebar = styled.div`
	width: 15rem !important;
	flex-shrink: 0;
	background: ${(props) => props.theme.colors.primary};
	color: ${(props) => props.theme.colors.accent};
	padding: 2rem;
	font-weight: 700;
	font-size: 1.1rem;
	.sidebar-element {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 1rem 0;
	}
	.slider {
		/* width: 50%; */
		margin-top: 0.3rem;
		color: ${(props) => props.theme.colors.accent};
		& .MuiSlider-thumb {
			box-shadow: none !important;
		}
		& .MuiSlider-thumb:hover,
		.MuiSlider-thumb.Mui-focusVisible {
			box-shadow: 0 0 0 10px rgba(72, 132, 107, 0.3) !important;
		}
	}
	button {
		font-family: ${(props) => props.theme.fonts.main};
		font-size: 1rem;
		padding: 0.7rem 0;
		width: 100%;
		background: ${(props) => props.theme.colors.accent};
		color: ${(props) => props.theme.colors.secondary};
		border: none;
		font-weight: 600;
		:hover {
			background: ${(props) => props.theme.colors.secondary};
			color: ${(props) => props.theme.colors.accent};
		}
		:disabled {
			background: #6b7d74;
			color: #3b4540;
		}
	}
`;

export default StyledSidebar;
