import { <% classname %> } from './<% name %>.model';

describe('<% classname %>', () => {
  it('should create an instance', () => {
    const model = new <% classname %>();
    expect(model).toBeTruthy();
  });
});