/**
 * Dummy type definitions for gulp-install as an example.
 */
/// <reference types="node"/>


declare module "gulp-install" {

    var gulpInstall: (opts: object | Function, done?: Function) => NodeJS.ReadWriteStream;
    export = gulpInstall;
}
