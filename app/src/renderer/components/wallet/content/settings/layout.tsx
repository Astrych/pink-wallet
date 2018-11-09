
import { styled } from "@view-utils/styles";


export const Content = styled.div`
    width: 300px;
    margin: 10px;
`;

export const Header = styled.h2`
    user-select: none;
    color: ${props => props.theme.text.secondary};
    text-align: center;
`;

export const Form = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    user-select: none;
    color: ${props => props.theme.text.secondary};
    margin: 15px 0px 5px 5px;
    font-size: 18px;
`;

export const Button = styled.button`
    user-select: none;
    background-color: ${props => props.theme.content.buttons.primary.background};
    color: ${props => props.theme.content.buttons.primary.text};
    border-radius: 3px;
    cursor: pointer;
    font-size: 18px;
    padding: 10px 30px;
    margin-right: 5px;
    margin-bottom: 5px;
    margin-top: 35px;
    border: none;
    outline: none;
    align-self: flex-end;
`;
