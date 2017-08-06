// @ts-check

import Path from './Path';

const path = new Path([[0, 0], [0, 1], [1, 1], [1, 2], [2, 2]]);

test('#distance', () => {
  expect(path.distance).toBeCloseTo(4);
});

test('#getPoint(0.0)', () => {
  expect(path.getPoint(0.0)).toMatchSnapshot();
});

test('#getPoint(0.2)', () => {
  expect(path.getPoint(0.2)).toMatchSnapshot();
});

test('#getPoint(0.4)', () => {
  expect(path.getPoint(0.4)).toMatchSnapshot();
});

test('#getPoint(0.5)', () => {
  expect(path.getPoint(0.5)).toMatchSnapshot();
});

test('#getPoint(0.8)', () => {
  expect(path.getPoint(0.8)).toMatchSnapshot();
});

test('#getPoint(1.0)', () => {
  expect(path.getPoint(1.0)).toMatchSnapshot();
});
