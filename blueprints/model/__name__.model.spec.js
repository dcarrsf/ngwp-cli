import { <% modelclassname %> } from './<% modelname %>.directive';

describe('<% modelclassname %>', () => {
  it('should create an instance', () => {
    const model = new <% modelclassname %>();
    expect(model).toBeTruthy();
  });
});