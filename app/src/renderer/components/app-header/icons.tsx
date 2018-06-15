
import React from "react";
import styled from "styled-components";
import { Clone } from "styled-icons/fa-regular";
import { Close } from "styled-icons/material/Close";
import { StyledIcon } from "styled-icons";


type StyledIcon2 = React.StatelessComponent<WindowIconProps>;

export type WindowIcon = StyledIcon<any> | StyledIcon2;

export const Img = styled.img`
    height: 25px;
    vertical-align: baseline;
`;

export function PinkIcon() {

    return <Img src="./img/icon-256x256.png" />;
}

export interface WindowIconProps {
    size: number;
    color: string;
    css: object;
}

export function WindowRestore(props: WindowIconProps) {

    return (
        <Clone
            size={props.size}
            color={props.color}
            css={{...props.css, transform: "rotate(90deg) scaleY(-1)"}}
        />
    );
}

export function WindowClose(props: WindowIconProps) {

    return (
        <Close
            viewBox="4 4 16 16"
            size={props.size}
            color={props.color}
            css={{...props.css}}
        />
    );
}

export {

    WindowMinimize,
    Square as WindowMaximize

} from "styled-icons/fa-regular";
