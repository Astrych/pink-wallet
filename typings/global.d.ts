
type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
    timeout: number;
};
type RequestIdleCallbackDeadline = {
    readonly didTimeout: boolean;
    timeRemaining: (() => number);
};

declare function requestIdleCallback(
    callback: ((deadline: RequestIdleCallbackDeadline) => void),
    opts ? : RequestIdleCallbackOptions,
): RequestIdleCallbackHandle;

declare function cancelIdleCallback(handle: RequestIdleCallbackHandle): void;

declare module "*.png";
declare module "*.svg";
declare module "*.woff";
declare module "*.woff2";
