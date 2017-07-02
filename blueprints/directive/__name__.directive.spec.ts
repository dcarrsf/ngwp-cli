import { <% directiveclassname %>Directive } from './<% directivename %>.directive';

describe('<% directiveclassname %>', () => {
  it('should create an instance', () => {
    const directive = new <% directiveclassname %>();
    expect(directive).toBeTruthy();
  });
});
