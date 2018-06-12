/**
 * Settings reducers.
 * @module settings/reducer
 * @see module:settings/actions
 * @see module:settings/selectors
 */

const initialState = {

    theme: "Dark"
};

/**
 * Settings' logic reducer (returns new state).
 */
export function settings(state=initialState, action) {

    // Does nothing (ignores unnecessary or wrong actions).
    return state;
}
