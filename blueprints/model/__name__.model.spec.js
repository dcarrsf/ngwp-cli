import { <% classname %>Model } from './<% name %>.model';

describe('<% classname %>Model', () => {
  it('should create an instance', () => {
    const model = new <% classname %>Model();
    expect(model).toBeTruthy();
  });
});