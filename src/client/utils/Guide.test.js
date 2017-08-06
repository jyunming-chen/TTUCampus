import Guide from './Guide';

const paths = new Guide(
  [
    {
      from: 'A',
      to: 'B',
      points: ['a', 'b', 'c'],
    },
    {
      from: 'A',
      to: 'C',
      points: ['a', 'd', 'e'],
    },
  ],
  [
    {
      id: 'a',
      name: 'a',
      position: [0, 0],
    },
    {
      id: 'b',
      name: 'b',
      position: [1, 1],
    },
    {
      id: 'c',
      name: 'c',
      position: [2, 2],
    },
    {
      id: 'd',
      name: 'd',
      position: [-1, -2],
    },
    {
      id: 'e',
      name: 'e',
      position: [-3, -4],
    },
  ],
);

test('new Paths(configPaths)', () => {
  expect(paths).toMatchSnapshot();
});

test('#getPath()', () => {
  expect(paths.getPath('unknown', 'unknown')).toBeUndefined();
  expect(paths.getPath('A', 'B')).toMatchSnapshot();
});
