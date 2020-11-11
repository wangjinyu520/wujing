'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_URL: '"/apis"',
  IMG_API: '"http://xiongwei.oss-cn-hangzhou.aliyuncs.com/"'
})
