const component = require('./commands/component');
const directive = require('./commands/directive');
const model = require('./commands/model');
const module = require('./commands/module');
const pipe = require('./commands/pipe');
const route = require('./commands/route');
const service = require('./commands/service');
const init = require('./commands/init');

// API
module.exports = {
  // Mixin template generators
  init,
  component,
  directive,
  model,
  module,
  pipe,
  route,
  service
}