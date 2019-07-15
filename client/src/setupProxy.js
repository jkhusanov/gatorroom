const proxy = require('http-proxy-middleware');

// PLEASE consult Jahon before changing this!
// Proxy setup
// eslint-disable-next-line func-names
module.exports = function(app) {
  app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
};
