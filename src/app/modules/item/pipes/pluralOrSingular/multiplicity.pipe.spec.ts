import { MultiplicityPipe } from './multiplicity.pipe';

describe('MultiplicityPipe', () => {
  it('create an instance', () => {
    const pipe = new MultiplicityPipe();
    expect(pipe).toBeTruthy();

    expect(pipe.transform({plural:'uova',singular:'uovo'},1)).toEqual('uovo')
    expect(pipe.transform({plural:'uova',singular:'uovo'},2)).toEqual('uova')
  });
});
