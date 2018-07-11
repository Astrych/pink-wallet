
const dark = {

    header: {
        bar: "darkgrey",
        buttons: {
            default: "white",
            hover: "black",
            active: {
                minimize: "yellow",
                maximizeRetore: "green",
                close: "red",
            },

        }
    },
    content: {
        primary: "#3b3b3b",
        secondary: "#525252",
    },
    text: {
        primary: "#f790b5",
    },
    tabs: {
        icons: "white",
        border: "#e8e8e8",
        scrolls: "#575757",
    },
    menu: "#434343",
};

const light = {

    header: {
        bar: "darkgrey",
        buttons: {
            default: "black",
            hover: "white",
            active: {
                minimize: "yellow",
                maximizeRetore: "green",
                close: "red",
            },
        }
    },
    content: {
        primary: "#eceaea",
        secondary: "white",
    },
    text: {
        primary: "#f04e97",
    },
    tabs: {
        icons: "black",
        border: "black",
        scrolls: "#e0e0e0",
    },
    menu: "#434343",
};

export default {
    dark,
    light,
    default: dark
};
