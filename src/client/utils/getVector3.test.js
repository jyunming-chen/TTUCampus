import getVector3 from './getVector3';

test('getVector3([1, 2])', () => {
  expect(getVector3([1, 2])).toMatchSnapshot();
});

test('getVector3([1, 2, 3])', () => {
  expect(getVector3([1, 2, 3])).toMatchSnapshot();
});
