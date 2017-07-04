const component = require('./commands/component');
const directive = require('./commands/directive');
const model = require('./commands/model');
const pipe = require('./commands/pipe');
const route = require('./commands/route');
const route_module = require('./commands/route_module');
const service = require('./commands/service');
const init = require('./commands/init');

// API
module.exports = {
  // Mixin template generators
  init,
  component,
  directive,
  model,
  pipe,
  route,
  route_module,
  service
}