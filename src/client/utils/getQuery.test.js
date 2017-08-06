import getQuery from './getQuery';

test('getQuery("?a=1&b=2")', () => {
  expect(getQuery('?a=1&b=2')).toMatchSnapshot();
});

test('getQuery("")', () => {
  expect(getQuery('')).toMatchSnapshot();
});

test('getQuery("?a&b=1")', () => {
  expect(getQuery('?a&b=1')).toMatchSnapshot();
});
