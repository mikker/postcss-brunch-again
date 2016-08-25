# postcss-brunch-again

Adds [PostCSS](https://github.com/ai/postcss) support to [brunch](https://github.com/brunch/brunch) [again](https://github.com/brunch/postcss-brunch).

## Install

    npm install --save-dev postcss-brunch-again

## Add plugins

    npm install --save-dev postcss-import postcss-cssnext

## Configure

`brunch-config.js`:

```javascript
plugins: {
  postcss: {
    processors: [
      require('postcss-import')({ path: 'dir/with/css' }),
      require('postcss-cssnext')()
    ]
  }
}
```

## Thanks

To the [original implementation](https://github.com/brunch/postcss-brunch).

## Development

    npm install
    npm run test

## License

MIT
