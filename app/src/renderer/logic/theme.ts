
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
                content: string;
            };
            secondary: {
                background: string;
                content: string;
            };
        };
        buttons: {
            primary: {
                background: string;
                content: string;
            };
            secondary: {
                background: string;
                content: string;
            };
        };
    };
    text: {
        primary: string;
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
                content: "white",
            },
            secondary: {
                background: "white",
                content: "black",
            },
        },
        buttons: {
            primary: {
                background: "#f78fb3",
                content: "white",
            },
            secondary: {
                background: "white",
                content: "black",
            },
        },
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
                background: "white",
                content: "black",
            },
            secondary: {
                background: "#3b3b3b",
                content: "white",
            },
        },
        buttons: {
            primary: {
                background: "#f78fb3",
                content: "white",
            },
            secondary: {
                background: "white",
                content: "black",
            },
        },
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

const themes = {
    dark,
    light,
    default: dark
};

export type ThemeName = keyof typeof themes;

export default themes;
