import { <%= moduleclassname %>Module } from './<%= dasherizedModuleName %>.module';

describe('<% moduleclassname %>Module', () => {
  let <% moduleclassname %>Module: <% moduleclassname %>Module;

  beforeEach(() => {
    <% moduleclassname %>Module = new <% moduleclassname %>Module();
  });

  it('should create an instance', () => {
    expect(<% moduleclassname %>Module).toBeTruthy();
  });
});
