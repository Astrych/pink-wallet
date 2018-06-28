
function doGo(it, options) {

    const {

        resolve,
        reject,
        onYield,

    } = options;

    requestIdleCallback(deadline => {

        try {

            let val = it.next();
            while (!val.done) {

                onYield && onYield(val.value);
                if (deadline.timeRemaining() <= 0) {
                    doGo(it, options);
                    return;
                }
                val = it.next();
            }
            resolve(val.value);

        } catch (err) {

            reject(err);
        }
    }, { timeout: 200 });
}

export function go(it, { onYield }) {
    return new Promise((resolve, reject) => {
        doGo(it, { resolve, reject, onYield });
    });
}
