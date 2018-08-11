
import { configure } from "@storybook/react";
import { addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { configureViewport } from "@storybook/addon-viewport";
import { withBackgrounds } from "@storybook/addon-backgrounds";
import { setOptions } from "@storybook/addon-options";


addDecorator(withKnobs);
addDecorator(withBackgrounds([
    { name: "Dark grey", value: "darkgrey", default: true },
    { name: "Light blue", value: "#00aced" },
    { name: "Dark blue", value: "#3b5998" },
    { name: "Dark pink", value: "#7f345a" },
    { name: "Pink", value: "pink" },
    { name: "White", value: "white" },
]))

const viewports = {
    splash: {
        name: "Splash",
        styles: {
            width: "815px",
            height: "756px"
        },
        type: "desktop"
    }
};
configureViewport({ viewports });

setOptions({
    addonPanelInRight: true
});

const req = require.context("../app/src/renderer/stories", true, /\.tsx?$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
