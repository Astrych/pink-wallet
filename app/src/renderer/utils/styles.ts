
import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

import { Theme } from "@logic/theme";


const {

    default: styled,
    css,
    injectGlobal,
    keyframes,
    ThemeProvider

} = styledComponents as ThemedStyledComponentsModule<Theme>;

export { styled, css, injectGlobal, keyframes, ThemeProvider };
