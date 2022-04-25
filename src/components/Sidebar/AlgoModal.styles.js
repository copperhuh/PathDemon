import styled from "styled-components";

const AlgoModalStyled = styled.div`
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.3);
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;
	.modal-bg {
		padding: 0;
		width: min(900px, 95%);
		max-height: 99vh;
		background: ${(props) => props.theme.colors.secondary};

		display: flex;
		flex-direction: column;
		align-content: center;
		color: ${(props) => props.theme.colors.light};
		overflow: auto;
		margin: 0;
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
	}
	.close-modal {
		background: none;
		color: ${(props) => props.theme.colors.light};
		border: none;
		position: absolute;
		top: 1rem;
		right: 1rem;
		:hover {
			transform: scale(1.3);
		}
	}

	h3 {
		text-align: center;
		font-size: 2rem;
		text-transform: uppercase;
	}

	.main-btns {
		width: 100%;
		height: fit-content;
		display: flex;
		background: ${(props) => props.theme.colors.light};
	}
	.main-btn {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		font-family: ${(props) => props.theme.fonts.main};
		background: ${(props) => props.theme.colors.light};
		color: ${(props) => props.theme.colors.secondary};
		font-weight: 900;
		font-size: 2rem;
		padding: 1rem 0;
		opacity: 0.4;
	}
	.current-main {
		background: ${(props) => props.theme.colors.secondary};
		color: ${(props) => props.theme.colors.light};
		opacity: 1;
	}

	.select {
		font-family: ${(props) => props.theme.fonts.main};
		color: ${(props) => props.theme.colors.light};
		background: ${(props) => props.theme.colors.secondary};
		border-radius: 0%;
		border: 0;
		font-weight: 600;
		width: fit-content;
		padding: 0 1rem;
		font-size: 2rem;
		margin: 1rem auto;
		text-align: center;
		transition: all 0.2s;
		position: relative;
		:hover,
		:focus {
			.MuiSvgIcon-root {
				transition: all 0.2s;
				transform: scale(1.5);
			}
		}
		.MuiSvgIcon-root {
			color: ${(props) => props.theme.colors.light};
			font-size: 2.5rem;
		}
		.MuiOutlinedInput-notchedOutline {
			border: none;
		}
	}

	.content {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 2rem 5rem;
		ol {
			margin: 1rem auto;
		}

		p,
		li {
			line-height: 1.7;
			margin: 0.6rem 1rem;
		}

		span {
			font-weight: 600;
		}
		max-height: 80vh;
		overflow: auto;
		&::-webkit-scrollbar {
			width: 10px;
		}
		&::-webkit-scrollbar-track {
			background: ${(props) => props.theme.colors.secondary};
		}
		&::-webkit-scrollbar-thumb {
			width: 7px;
			background: ${(props) => props.theme.colors.light};
			border-radius: 5px;
		}
	}

	@media (max-width: 700px) {
		.content {
			padding: 2rem;
		}
	}
	@media (max-width: 400px) {
		.content {
			padding: 0.8rem;
			/* font-size: 0.85rem; */
			li {
				margin: 0.8rem 0;
			}
			ol {
				padding-left: 1.4rem;
			}
		}
	}
`;

export default AlgoModalStyled;
