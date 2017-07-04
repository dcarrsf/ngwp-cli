import { <% classname %>Model } from './<% name %>.model';

describe('Model: <% classname %>', () => {
  it('should create an instance', () => {
    const model = new <% classname %>Model();
    expect(model).toBeTruthy();
  });
});