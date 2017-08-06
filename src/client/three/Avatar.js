// @ts-check

import {
  BoxGeometry,
  Mesh,
  Object3D,
  SphereGeometry,
  MeshNormalMaterial,
  MeshBasicMaterial,
} from 'three';

export default class AvatarGeometry extends Object3D {
  /**
   * @param {{ width: number, height: number, depth: number }} body
   * @param {{ radius: number, offset: number, texture: THREE.Texture }} head
   */
  constructor(body, head) {
    super();

    const bodyMesh = new Mesh(
      new BoxGeometry(body.width, body.height, body.depth).translate(
        0,
        body.height / 2,
        0,
      ),
      new MeshNormalMaterial(),
    );

    const headMesh = new Mesh(
      new SphereGeometry(head.radius).translate(0, head.offset, 0),
      new MeshBasicMaterial({ map: head.texture }),
    ).rotateY(Math.PI / -2);

    this.add(bodyMesh, headMesh);
  }
}
