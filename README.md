# Bufallo Wallet

New, alternative wallet GUI. Work in progress.

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

OSX (wallet is not working for now due to the lack of support for Mac OS daemon binary):

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

## Storybook

```
npm run storybook
```

## Project configs

1. Building - config.js (task/config.js)

