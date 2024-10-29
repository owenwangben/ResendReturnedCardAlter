import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('filter array', () => {
    const pipe = new FilterPipe();
    const arr = [{a: 1, b: 1}, {a: 1, b: 2}, {a: 2, b: 1}, {a: 1, b: 3}];

    const result = pipe.transform(arr, 'a', 1);
    expect(result.length).toBe(3);
  });
});
