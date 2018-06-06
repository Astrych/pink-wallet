
import React from "react";
import { Close } from "styled-icons/material/Close";
import { StyledIcon } from "styled-icons";


export const WindowClose = (props) => <Close
    viewBox="4 4 16 16"
    size={25}
    color="inherit"
    css={{verticalAlign: "baseline"}}
/>;

export {
    
    WindowMinimize,
    Square as WindowMaximize,
    Clone as WindowRestore

} from "styled-icons/fa-regular";
