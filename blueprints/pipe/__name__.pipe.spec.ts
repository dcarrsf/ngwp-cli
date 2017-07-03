import { <%= pipeclassname %>Pipe } from './<%= pipename %>.pipe';

describe('<%= pipeclassname %>', () => {
  it('create an instance', () => {
    const pipe = new <% pipeclassname %>();
    expect(pipe).toBeTruthy();
  });
});
