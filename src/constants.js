module.exports = {
  speed: 15,
  defaults: {
    from: 'ttu-front-door',
  },
  floorPlan: {
    size: [791, 518],
    origin: [660, 340], // ↘︎
  },
  avatar: {
    body: { width: 4, height: 10, depth: 2 },
    head: { radius: 3, offset: 9, texture: './resources/avatar.png' },
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
  places: /** @type {{ id: string, name: string, region?: [number, number][], height?: number }[]} */ ([
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
    {
      id: 'A5',
      name: 'A5',
      height: 40,
      region: [[-305, 55], [-320, 160], [-365, 155], [-350, 50]],
    },
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
      id: 'ttu-front-door',
      name: 'TTU Front Door',
      region: [[-240, 5], [-220, 5], [-220, 0], [-240, 0]],
    },
    // eslint-disable-next-line prettier/prettier
  ]),
  points: [
    { id: 'ttu-front-door', name: 'TTU Front Door', position: [-230, 0] },
    { id: 'unnamed-1', name: 'Unnamed 1', position: [-230, 30] },
    { id: 'unnamed-2', name: 'Unnamed 2', position: [-130, 30] },
    { id: 'unnamed-3', name: 'Unnamed 3', position: [-130, 100] },
    { id: 'unnamed-4', name: 'Unnamed 4', position: [-55, 100] },
    { id: 'A3-front-door', name: 'A3 Front Door', position: [-55, 90] },
    { id: 'A1-front-door', name: 'A1 Front Door', position: [-250, 25] },
    { id: 'unnamed-5', name: 'Unnamed 5', position: [-240, 50] },
    { id: 'unnamed-6', name: 'Unnamed 6', position: [-270, 70] },
    { id: 'A5-front-door', name: 'A5 Front Door', position: [-305, 65] },
  ],
  paths: [
    {
      from: 'ttu-front-door',
      to: 'A3',
      points: [
        'ttu-front-door',
        'unnamed-1',
        'unnamed-2',
        'unnamed-3',
        'unnamed-4',
        'A3-front-door',
      ],
    },
    // {
    //   from: 'ttu-front-door',
    //   to: 'A1',
    //   points: ['ttu-front-door', 'A1-front-door'],
    // },
    {
      from: 'ttu-front-door',
      to: 'A5',
      points: ['ttu-front-door', 'unnamed-5', 'unnamed-6', 'A5-front-door'],
    },
  ],
};
