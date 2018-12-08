

type OnYeldFunction = (ret: any) =>  void;

interface DoGoOptions {
    resolve: (value?: {} | PromiseLike<{}> | undefined) => void;
    reject: (reason?: any) => void;
    onYield: OnYeldFunction;
}

function doGo(task: Iterator<any>, options: DoGoOptions) {

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

interface GoOptions {
    onYield: OnYeldFunction;
}

export function go(task: Iterator<any>, { onYield }: GoOptions) {
    return new Promise((resolve, reject) => {
        doGo(task, { resolve, reject, onYield });
    });
}
