# react-signature

A universal react svg signature component.

## features

- **super simple** API

## install

`npm i -S @chr33s/react-signature`

## usage

```js
//- <script src='/dist/signature.min.js'></script>
const Signature = require('@chr33s/react-signature')

<form>
    <Signature ref={(signature) => {this.signature = signature}} />
</form>
```

## api

### `this.signature.load(path)`

Load a signature from a path

### `this.signature.get()`

Get the signature path

### `this.signature.clear()`

Clear the signature path

## license

MIT. Copyright (c) [chr33s](https://github.com/chr33s).
