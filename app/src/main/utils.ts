
import { screen } from "electron";


export function centerWindow(window) {
    const dimensions = window.getBounds();
    const display = screen.getDisplayMatching(dimensions) || screen.getPrimaryDisplay();
    const x = display.bounds.x + (display.bounds.width - dimensions.width)/2;
    const y = display.bounds.y + (display.bounds.height - dimensions.height)/2;
    window.setPosition(x, y);
}
