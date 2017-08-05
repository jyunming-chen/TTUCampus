// @ts-check

import constants from '../../constants';
import ConfigPaths from './ConfigPaths';

export default function getConfigPaths() {
  const paths = constants.paths;
  return new ConfigPaths(paths);
}
