import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import Main from "./components/Main";
import Theme from "./Theme";
import { Provider } from "react-redux";
import { store } from "./redux/Store";

const GlobalStyles = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
  html, body{
    overflow-x: hidden;
    overflow-y: auto;
    max-width: 100%;
    scroll-behavior: smooth;
    box-sizing: border-box;
    font-family: ${(props) => props.theme.fonts.main};
  }
  button{
    user-select: none;
  }
  button, a{
    transition: all 0.2s;
    
    &:hover, &:focus, a{
      transition: all 0.2s;
    }
  }
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    /* font-family: 'Montserrat', sans-serif; */
    overflow-x: hidden;
    
    &::-webkit-scrollbar{
      width: 10px;
    }
    &::-webkit-scrollbar-track{
    }
    &::-webkit-scrollbar-thumb{
      width: 7px;
      border-radius: 5px;
    }
  }
  #root{
    height: 100%;
    width: 100%;
  }
  /* ::-moz-selection {
  }
  ::-webkit-selection {
  }
  ::selection {
  } */
`;

function App() {
	return (
		<Theme>
			<Provider store={store}>
				<GlobalStyles />
				<Header />
				<Main />
			</Provider>
		</Theme>
	);
}

export default App;
