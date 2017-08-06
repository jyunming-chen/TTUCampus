// @ts-check

import { BoxGeometry, Mesh } from 'three';

export default class AvatarGeometry extends Mesh {
  /**
   * @param {{ width: number, height: number, depth: number }} body
   * @param {{ radius: number, offset: number }} head
   */
  constructor(body, head) {
    const geometry = new BoxGeometry(
      body.width,
      body.height,
      body.depth,
    ).translate(0, body.height / 2, 0);
    super(geometry);
  }
}
