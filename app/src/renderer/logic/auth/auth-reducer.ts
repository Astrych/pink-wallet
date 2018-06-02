/**
 * Authentication reducers.
 * @module auth/auth-reducer
 * @see module:auth/auth-actions
 * @see module:auth/auth-epics
 * @see module:auth/auth-selectors
 */


// State at the begining of program.
const initialState = {

};


/**
 * Authentication's logic reducer (returns new state).
 * @param {Object} state - storage state
 * @param {Object} action - dispatched Redux action
 * @return {Object} the next state
 */
export function auth(state=initialState, action) {

    // Does nothing (ignores unnecessary or wrong actions).
    return state;
} 
