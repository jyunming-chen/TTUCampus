// @ts-check

import { ExtrudeGeometry, Shape } from 'three';
import getConfigVector2 from '../utils/getConfigVector2';

export default class PlaceAreaGeometry extends ExtrudeGeometry {
  /**
   * @param {[number, number][]} region
   */
  static createShape(region) {
    const shape = new Shape();

    /** @type {number} */ let initX;
    /** @type {number} */ let initY;
    region.forEach((point, index) => {
      const { x, y } = getConfigVector2(point);
      if (index === 0) {
        shape.moveTo(x, y);
        initX = x;
        initY = y;
      } else {
        shape.lineTo(x, y);
      }
      if (index === region.length - 1) {
        shape.lineTo(initX, initY);
      }
    });

    return shape;
  }

  /**
   * @param {{ region: [number, number][], height?: number }} data
   */
  constructor(data) {
    const { height = 0 } = data;
    super(PlaceAreaGeometry.createShape(data.region), {
      amount: height,
      bevelEnabled: false,
    });
    this.data = data;
  }
}
