# Pinkcoin Wallet GUI

## Requirements

1. Node.js 10.1.0 or higher.

## Instalation and running in dev mode

```
npm install
npm start
```

## Building in production mode

Linux:

```
npm install
npm run linux-builder
```

Windows:

```
npm install
npm run windows-builder
```

OSX:

```
npm install
npm run mac-builder
```

All platforms:

```
npm install
npm run builder
```

## Project configs

1. Building - config.js (task/config.js)


## Used libraries

1. React
2. Ant Design (React UI components)
3. styled-components (dynamic CSS in JS styling)
4. styled-icons (a lot of nice looking icons)
5. react-spring (animations)
7. Redux (state management)
8. Reselect (selector library for Redux)
9. react-i18next (localization support)

## Translation

https://react.i18next.com/

## Testing

ts-jest and jest

https://github.com/iRath96/electron-react-typescript-boilerplate

## Other projects using Electron + Web tech:

1. ETH Mist wallet
2. XEL wallet
3. PART wallet
4. TIME (Chronobank) wallet
5. IOTA wallet
6. LSK wallet (lisk-hub)
7. Others...

## Good non-cryptocurrency projects using Electron + Web tech:

1. https://github.com/Microsoft/vscode
2. https://github.com/desktop/desktop
3. https://github.com/zeit/hyper
4. Others...

## TODO

1. Auto-updater module.
2. Auto-downloader (donwloading right daemon) module.
3. 3 states: Full app, Widget, Tray.
4. ...