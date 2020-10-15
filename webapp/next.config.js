import secrets from './secrets'

const withPWA = require('next-pwa')
 
module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  env:{
    GMapsKey: secrets.GMapsKey
  }
})