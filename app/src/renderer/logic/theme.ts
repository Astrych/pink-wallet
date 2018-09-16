
export interface Theme {
    header: {
        bar: string;
        buttons: {
            default: string;
            hover: string;
            active: {
                minimize: string;
                maximizeRetore: string;
                close: string;
            }
        };
    };
    content: {
        primary: string;
        secondary: string;
        selects: {
            primary: {
                background: string;
                text: string;
            };
            secondary: {
                background: string;
                text: string;
            };
        };
        buttons: {
            primary: {
                background: string;
                text: string;
            };
            secondary: {
                background: string;
                text: string;
            };
        };
    };
    text: {
        primary: string;
        secondary: string;
    };
    tabs: {
        icons: string;
        border: string;
        scrolls: string;
    };
    menu: string;
}

const dark: Theme = {

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
        selects: {
            primary: {
                background: "#3b3b3b",
                text: "white",
            },
            secondary: {
                background: "white",
                text: "black",
            },
        },
        buttons: {
            primary: {
                background: "#f78fb3",
                text: "white",
            },
            secondary: {
                background: "white",
                text: "black",
            },
        },
    },
    text: {
        primary: "#f790b5",
        secondary: "white",
    },
    tabs: {
        icons: "white",
        border: "#e8e8e8",
        scrolls: "#575757",
    },
    menu: "#434343",
};

const light: Theme = {

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
        selects: {
            primary: {
                background: "#D8D8D8",
                text: "black",
            },
            secondary: {
                background: "#E8E8E8",
                text: "white",
            },
        },
        buttons: {
            primary: {
                background: "#f78fb3",
                text: "white",
            },
            secondary: {
                background: "white",
                text: "black",
            },
        },
    },
    text: {
        primary: "#f04e97",
        secondary: "black",
    },
    tabs: {
        icons: "black",
        border: "black",
        scrolls: "#e0e0e0",
    },
    menu: "#434343",
};

const themes = {
    dark,
    light,
    default: dark
};

export type ThemeName = keyof typeof themes;

export default themes;
