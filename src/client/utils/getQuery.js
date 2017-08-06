// @ts-check

/**
 * @param {string} querystring e.g. `?aaa=111&bbb=222`
 * @return {Partial<Record<string, string>>}
 */
export default function getQuery(querystring) {
  return decodeURI(querystring)
    .slice(1) // remove `?`
    .split('&')
    .filter(x => x.length > 0) // remove ''
    .reduce((query, segment) => {
      const splitAt = segment.indexOf('=');
      const key = splitAt === -1 ? segment : segment.slice(0, splitAt);
      const value = splitAt === -1 ? undefined : segment.slice(splitAt + 1);
      return Object.assign({}, query, { [key]: value });
    }, {});
}
