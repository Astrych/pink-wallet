/// <reference types="node"/>


declare module "gulp-install" {

    var gulpInstall: (opts: object | Function, done?: Function) => NodeJS.ReadWriteStream;
    export = gulpInstall;
}
