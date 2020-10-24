const withPWA = require('next-pwa')
 
module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  env:{
    GMapsKey: 'AIzaSyCJeBzrM8qUxjsmQ6ZET_zqU9UVUMTUMD4'
  }
})
