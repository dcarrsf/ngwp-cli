import { <%= classname %>Pipe } from './<% name %>.pipe';

describe('<%= classname %>Pipe', () => {
  it('create an instance', () => {
    const pipe = new <% classname %>Pipe();
    expect(pipe).toBeTruthy();
  });
});
