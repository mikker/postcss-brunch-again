/* globals it, describe, beforeEach */
const PostCSSPlugin = require('./index')
const fs = require('fs')
const expect = require('expect')

const defaultProcessors = [
  require('autoprefixer')({browsers: 'last 99 versions'}),
  require('css-mqpacker'),
  require('csswring')
]
const defaultConfig = {
  paths: {root: '.'},
  plugins: {
    postcss: {
      processors: defaultProcessors
    }
  }
}

describe('PostCSSPlugin', () => {
  let config

  beforeEach(() => {
    config = Object.assign({}, defaultConfig)
  })

  it('is a Brunch plugin', () => {
    const plugin = new PostCSSPlugin(config)
    expect(plugin).toBeA(Object)
    expect(plugin.brunchPlugin).toBe(true)
    expect(plugin.extension).toEqual('css')
    expect(plugin.type).toEqual('stylesheet')
  })

  it('compiles sample file', () => {
    const data = fs.readFileSync('fixtures/sample.css', 'utf-8')
    const expected = fs.readFileSync('fixtures/sample.out.css', 'utf-8')

    return new PostCSSPlugin(config).compile({data})
      .then((actual) => {
        expect(actual.data).toEqual(expected)
      })
  })

  it('compiles with sourcemaps', () => {
    const data = fs.readFileSync('fixtures/sample.css', 'utf-8')
    const map = {
      version: 3,
      sources: [ 'fixtures/sample.css' ],
      names: [],
      mappings: 'AAKA,QACE,oBAAc,AAAd,qBAAc,AAAd,iBAAc,AAAd,oBAAc,AAAd,YAAc,CACf,AAPD,cACE,GACE,UAAY,CACb,AAMD,GACE,UAAY,CACb,CAPF',
      file: 'sample.css'
    }

    return new PostCSSPlugin(config)
      .compile({data, path: 'fixtures/sample.css'})
      .then((file) => {
        expect(file.map).toEqual(map)
      })
  })

  it('compiles with include', () => {
    const data = fs.readFileSync('fixtures/bundle.css', 'utf-8')
    const expected =
      fs.readFileSync('fixtures/bundle.out.css', 'utf-8')

    config.plugins.postcss.processors =
      [require('postcss-import')()].concat(defaultProcessors)

    return new PostCSSPlugin(config).compile({data})
      .then((actual) => {
        expect(actual.data + '\n').toEqual(expected)
      })
  })
})
