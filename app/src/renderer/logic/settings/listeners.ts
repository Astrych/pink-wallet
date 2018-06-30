
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function themeListener1({ action, dispatch, state }) {

    console.debug("ThemeListener 1");
    await timeout(3000);
    dispatch({
        type: "SUCCESS1"
    });
}

export async function themeListener2({ action, dispatch, state }) {

    console.debug("ThemeListener 2");
    dispatch({
        type: "SUCCESS2"
    });
}
