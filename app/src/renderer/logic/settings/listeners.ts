
export async function themeListener({ action, dispatch, state }) {

    console.log("DISPATCH TEST! 2");
    dispatch({
        type: "SUCCESS"
    });
}
