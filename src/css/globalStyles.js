import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root {
  --color-primary: #a976f7; 
}
html {
box-sizing: border-box;
}
*, *:before, *:after {
box-sizing: inherit;
}

body {
  
  font-family: 'Open Sans', sans-serif;
  background-color: #FBF7FF;
}
#modal-root {
  position: relative;
}

`;
