const component = require('./commands/component');
const directive = require('./commands/directive');
const model = require('./commands/model');
const pipe = require('./commands/pipe');
const route = require('./commands/route');
const service = require('./commands/service');
const init = require('./commands/init');

export default {
  // Mixin template generators
  init,
  component,
  directive,
  model,
  pipe,
  route,
  service
}