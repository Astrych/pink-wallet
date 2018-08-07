
import { configure } from "@storybook/react";
import { setAddon, addDecorator } from "@storybook/react";
import JSXAddon from "storybook-addon-jsx";
import { withKnobs } from "@storybook/addon-knobs/react";


addDecorator(withKnobs);
setAddon(JSXAddon);

const req = require.context("../app/src/renderer/stories", true, /\.tsx?$/);

function loadStories() {
    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
