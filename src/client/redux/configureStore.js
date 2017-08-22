const prodConfigureStore = require('./configureStore.prod');
const devConfigureStore = require('./configureStore.dev');

if (process.env.NODE_ENV === 'production') {
  module.exports = prodConfigureStore;
} else {
  module.exports = devConfigureStore;
}
