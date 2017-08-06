module.exports = {
  scale: 0.75,
  speed: 15,
  floorPlan: {
    size: [791, 518],
    origin: [660, 340], // ↘︎
  },
  avatar: {
    size: [5, 10, 5],
    position: [-230, 0],
  },
  camera: {
    god: {
      position: [-230, 200, 100],
    },
    '3rd': {
      position: [0, 50, -125],
    },
  },
  // eslint-disable-next-line prettier/prettier
  places: /** @type {{ id: string, name: string, region?: [number, number][] }[]} */ ([
    {
      id: 'A1',
      name: 'A1',
      height: 40,
      region: [[-250, 10], [-330, 10], [-330, 40], [-250, 40]],
    },
    { id: 'A2', name: 'A2' },
    {
      id: 'A3',
      name: 'A3',
      height: 40,
      region: [[-60, 90], [0, 90], [0, 70], [-35, 70], [-35, 0], [-60, 0]],
    },
    { id: 'A4', name: 'A4' },
    { id: 'A5', name: 'A5' },
    { id: 'A6', name: 'A6' },
    { id: 'A7', name: 'A7' },
    {
      id: 'A8',
      name: 'A8',
      height: 30,
      region: [
        [-225, 35],
        [-225, 85],
        [-195, 85],
        [-195, 95],
        [-165, 95],
        [-165, 85],
        [-135, 85],
        [-135, 35],
        [-165, 35],
        [-165, 25],
        [-195, 25],
        [-195, 35],
      ],
    },
    { id: 'A9', name: 'A9' },
    {
      id: 'zhi-sheng-ji-nian-guan',
      name: 'Zhì Shēng Jì Niàn Guǎn',
      height: 20,
      region: [[-125, 90], [-70, 90], [-70, 0], [-125, 0]],
    },
    {
      id: 'front-door',
      name: 'Front Door',
      region: [[-240, 5], [-220, 5], [-220, 0], [-240, 0]],
    },
    // eslint-disable-next-line prettier/prettier
  ]),
  paths: [
    {
      from: 'front-door',
      to: 'A3',
      points: [
        [-230, 0],
        [-230, 30],
        [-130, 30],
        [-130, 100],
        [-55, 100],
        [-55, 90],
      ],
    },
  ],
};
