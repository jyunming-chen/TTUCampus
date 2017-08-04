// @ts-check

import { BoxGeometry } from 'three';
import constants from '../../constants';
import getConfigVector3 from '../utils/getConfigVector3';

export default class AvatarGeometry extends BoxGeometry {
  constructor() {
    const size = getConfigVector3(constants.avatar.size);
    super(size.x, size.y, size.z);
  }
}
