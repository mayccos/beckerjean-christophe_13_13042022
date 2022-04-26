import { createGlobalStyle } from 'styled-components'
import { colors } from './colors'

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: ${colors.grey}};
    }
    body {
        margin: 0;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    a {
        text-decoration: none;
    }
    .main {
        flex: 1;
        background-color: ${colors.darkBlue};
    }
  
    button {
        cursor: pointer;
    }

    img {
        width: 100%;
        object-fit: cover;
        box-sizing: border-box;
    }
    .sr-only {
        border: 0 !important;
        clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
        -webkit-clip-path: inset(50%) !important;
        clip-path: inset(50%) !important; /* 2 */
        height: 1px !important;
        margin: -1px !important;
        overflow: hidden !important;
        padding: 0 !important;
        position: absolute !important;
        width: 1px !important;
        white-space: nowrap !important; /* 3 */
    }
    .sign-in-icon {
        font-size: 5rem;
    }
`
export default function GlobalStyle() {
    return <StyledGlobalStyle />
}
