
import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

import { Theme } from "@view-logic/theme";


const {

    default: styled,
    css,
    createGlobalStyle,
    keyframes,
    ThemeProvider

} = styledComponents as ThemedStyledComponentsModule<Theme>;

export { styled, css, createGlobalStyle, keyframes, ThemeProvider };
