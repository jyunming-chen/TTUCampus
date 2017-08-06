import Paths from './Paths';

const paths = new Paths([
  {
    from: 'A',
    to: 'B',
    points: [[0, 0], [1, 1], [2, 2]],
  },
  {
    from: 'A',
    to: 'C',
    points: [[0, 0], [-1, -2], [-3, -4]],
  },
]);

test('new Paths(configPaths)', () => {
  expect(paths).toMatchSnapshot();
});

test('#getPath()', () => {
  expect(paths.getPath('unknown', 'unknown')).toBeUndefined();
  expect(paths.getPath('A', 'B')).toMatchSnapshot();
});
