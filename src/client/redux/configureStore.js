if (process.env.NODE_ENV === 'production') {
  console.warn('----------------------\nUsing production Store\n----------------------');
  module.exports = require('./configureStore.prod');
} else {
  console.log('-----------------------\nUsing development Store\n-----------------------');
  module.exports = require('./configureStore.dev');
}
