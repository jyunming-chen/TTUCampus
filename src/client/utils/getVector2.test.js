import getVector2 from './getVector2';

test('getVector2([1, 2])', () => {
  expect(getVector2([1, 2])).toMatchSnapshot();
});
