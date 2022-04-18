import styled from "styled-components";

const StyledHeader = styled.div`
	height: 8vh;
	width: 100%;
	background: ${(props) => props.theme.colors.accent};
	color: ${(props) => props.theme.colors.primary};
	font-size: 2.8rem;
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default StyledHeader;
