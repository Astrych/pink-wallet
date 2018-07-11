

import settings from "../settings/reducer";
import { CHANGE_THEME } from "../settings/types";


describe("Settings reducer", () => {
    it("should work", () => {

        const state = settings.initialState;
        const newState = settings.reducer(state, {
            type: CHANGE_THEME,
            payload: "light"
        });
        expect(newState.currentTheme).toBe("light");
    });
});
