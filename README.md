# Pinkcoin Wallet GUI

Bare bone project (app shell). Work in progress.

## Requirements

Node.js: developed with version 10.1.0.

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

## Tests running

Tests only:
```
npm test
```

Tests + coverage:
```
npm run coverage
```

## Project configs

1. Building - config.js (task/config.js)

## TODO

1. Auto-downloader module: downloading platform-specific daemon wallet.
2. Auto-updater module (for UI and daemon).
3. Responsive layout / 3 modes: full app, widget, in-tray.
4. Internationalisation integration.
5. ...
