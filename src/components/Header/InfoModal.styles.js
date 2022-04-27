import styled from "styled-components";

const InfoModalStyled = styled.div`
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
		padding: 2rem 5rem;
		width: min(900px, 95%);
		max-height: 95vh;
		background: ${(props) => props.theme.colors.secondary};
		position: relative;
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

	.legend {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
	}

	.legend-section {
		display: flex;
		text-transform: uppercase;
		justify-content: center;
		align-items: center;
		margin: 2rem 2rem;
		width: fit-content;
		font-weight: 600;
		font-size: 1.2rem;
	}

	.node {
		flex-shrink: 0;
		height: 3rem;
		width: 3rem;
		margin: 0 2rem;
		border-radius: 10%;
		font-size: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.empty {
		background: ${(props) => props.theme.colors.light};
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
	}
	.target {
		background: #664870;
	}

	@media (max-width: 980px) {
		.modal-bg {
			padding: 2rem;
		}
	}
	@media (max-width: 810px) {
		.legend {
			grid-template-columns: 1fr;
			width: fit-content;
		}
		.legend-section {
			margin: 1.2rem;
		}
		.modal-bg {
			align-items: center;
			max-width: fit-content;
		}
	}
	@media (max-width: 330px) {
		.legend-section {
			margin: 1rem 0.5rem;
		}
		.node {
			margin-left: 0;
		}
	}
`;

export default InfoModalStyled;
