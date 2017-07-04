import { <%= moduleclassname %>Module } from './<%= dasherizedModuleName %>.module';

describe('<% moduleclassname %>Module', () => {
  let <% classname %>Module: <% classname %>Module;

  beforeEach(() => {
    <% classname %>Module = new <% classname %>Module();
  });

  it('should create an instance', () => {
    expect(<% classname %>Module).toBeTruthy();
  });
});
