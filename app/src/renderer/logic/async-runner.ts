
function doGo(task, options) {

    const {

        resolve,
        reject,
        onYield,

    } = options;

    requestIdleCallback(deadline => {

        try {

            let val = task.next();
            while (!val.done) {

                onYield && onYield(val.value);
                if (deadline.timeRemaining() <= 0) {
                    doGo(task, options);
                    return;
                }
                val = task.next();
            }
            resolve(val.value);

        } catch (err) {

            reject(err);
        }
    }, { timeout: 200 });
}

export function go(task, { onYield }) {
    return new Promise((resolve, reject) => {
        doGo(task, { resolve, reject, onYield });
    });
}
