# keynote-loader

A webpack loader to parse and load Apple's Keynote (.key) files

This is powered by the [keynote](https://github.com/pranaygp/keynote-parser) project to parse `.key` files

## Setup

```bash

yarn add --dev keynote-loader
# npm install --save-dev keynote-loader
```

and then add this rule to your `webpack.config.js` ([example](/test/react/webpack.config.js))

```javascript
...
  {
  test: /\.key$/,
  loader: 'keynote-loader'
  }
...
```

## Usage

To use this, just drop a `require/import` to a `.key` file, and the data loaded will be in the same [format](https://github.com/pranaygp/keynote-parser#format-for-data) from [keynote](https://github.com/pranaygp/keynote-parser). This could then be used from your Javascript project to use the data however you please. ([example](/test/react/index.js))

```javascript
import presentation from './test.key'

console.log(presentation);
```