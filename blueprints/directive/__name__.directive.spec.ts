import { <% classname %>Directive } from './<% name %>.directive';

describe('<% classname %>'Directive, () => {
  it('should create an instance', () => {
    const directive = new <% classname %>Directive();
    expect(directive).toBeTruthy();
  });
});
