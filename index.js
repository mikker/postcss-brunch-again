'use strict'

const path = require('path')
const progeny = require('progeny')
const postcss = require('postcss')

class PostCSSPlugin {
  constructor (config) {
    const postcssConfig =
      config && config.plugins && config.plugins.postcss || {}

    this.mapOpts = Object.assign({
      inline: false,
      annotation: false,
      sourcesContent: false
    }, postcssConfig.map)

    this.getDependencies = progeny({
      rootPath: config.paths.root,
      reverseArgs: true
    })

    this.processor = postcss(postcssConfig.processors || [])
  }

  compile (file) {
    const filePath = file.path
    const map = Object.assign({}, this.mapOpts)
    const opts = {
      from: filePath,
      to: filePath && path.basename(filePath),
      map
    }

    return this.processor.process(file.data, opts)
      .then((result) => {
        return {
          path: filePath,
          data: result.css,
          map: result.map.toJSON()
        }
      })
  }
}

Object.assign(PostCSSPlugin.prototype, {
  brunchPlugin: true,
  type: 'stylesheet',
  extension: 'css'
})

module.exports = PostCSSPlugin
