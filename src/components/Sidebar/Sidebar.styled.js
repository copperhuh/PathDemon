import styled from "styled-components";

const StyledSidebar = styled.div`
	width: 15rem !important;
	flex-shrink: 0;
	background: ${(props) => props.theme.colors.primary};
	color: ${(props) => props.theme.colors.light};
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
		color: ${(props) => props.theme.colors.light};
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
		background: ${(props) => props.theme.colors.light};
		color: ${(props) => props.theme.colors.secondary};
		border: none;
		font-weight: 600;
		:hover {
			background: ${(props) => props.theme.colors.secondary};
			color: ${(props) => props.theme.colors.light};
		}
		:disabled {
			background: #807e7a;
			color: #3b4540;
		}
	}
	.select {
		font-family: ${(props) => props.theme.fonts.main};
		color: ${(props) => props.theme.colors.secondary};
		background: ${(props) => props.theme.colors.light};
		border-radius: 0%;
		border: 0;
		font-weight: 600;
		text-align: center;
		transition: all 0.2s;
		:hover,
		:focus {
			background: ${(props) => props.theme.colors.secondary};
			color: ${(props) => props.theme.colors.light};
			transition: all 0.2s;
			.MuiSvgIcon-root {
				color: ${(props) => props.theme.colors.light};
			}
		}
		.MuiOutlinedInput-notchedOutline {
			border: none;
		}
	}
	.MuiInputLabel-root {
		font-family: ${(props) => props.theme.fonts.main};
		color: ${(props) => props.theme.colors.light} !important;
		font-weight: 600;
		top: -20%;
		left: 8%;
	}
	.MuiFormControl-root {
		margin-top: 1.2rem;
	}
`;

export default StyledSidebar;
