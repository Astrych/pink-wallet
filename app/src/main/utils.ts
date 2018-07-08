
import { BrowserWindow, screen } from "electron";


export function centerWindow(window: BrowserWindow): void {

    const dimensions = window.getBounds();
    const display = screen.getDisplayMatching(dimensions) || screen.getPrimaryDisplay();
    const x = display.bounds.x + (display.bounds.width - dimensions.width)/2;
    const y = display.bounds.y + (display.bounds.height - dimensions.height)/2;
    window.setPosition(x, y);
}

export function getCenterPos(width, height) {

    const display = screen.getPrimaryDisplay();
    const x = display.bounds.x + (display.bounds.width - width)/2;
    const y = display.bounds.y + (display.bounds.height - height)/2;
    return [x, y];
}
