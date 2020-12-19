import {readFileToString} from '../utils/readFileToString';

export const taskThree = () => {
  const [inputA, inputB] = readFileToString('./challenges/inputs/3.txt').split('\r\n');
  const wireAInstructions = inputA.split(',');
  const wireBInstructions = inputB.split(',');
  const wireACoords = generateCoordinatesOccupiedByWire(wireAInstructions);
  const wireBCoords = generateCoordinatesOccupiedByWire(wireBInstructions);

  const intersections = findIntersections(wireACoords, wireBCoords);

  console.log(findShortestDistance(intersections));

  console.log('candidate intersections are', intersections);

  const intersectionDistances = intersections.map(i => findIntersectionDistance(i, wireACoords, wireBCoords)).sort((a,b) => a < b ? -1 : a===b ? 0 : 1)[0] + 2; // (because arrays are 0 indexed)

  console.log(intersectionDistances);

};

export const findShortestDistance = (intersections: Array<string>) => {
  let shortestDistance = -1;

  intersections.forEach((coordinates: string) => {
    const [x,y] = coordinates.split(',').map(c => Math.abs(parseInt(c)));
    const nextDistance = x+y;
    shortestDistance = shortestDistance === -1 || nextDistance < shortestDistance ? nextDistance : shortestDistance;
  });
  return shortestDistance;
};

export const findIntersections = (wireA_: Array<string>, wireB_: Array<string>) => {
  const wireA = new Set(wireA_);
  const wireB = new Set(wireB_);

  const intersects = [...wireA].filter(value => wireB.has(value));
  return intersects.length > 0 ? intersects : [''];
};

export const findIntersectionDistance = (intersection: string, wireA: Array<string>, wireB: Array<string>): number => {
  return wireA.indexOf(intersection) + wireB.indexOf(intersection);
};

export const generateCoordinatesOccupiedByWire = (wire: Array<string>) => {
  let currentX = 0;
  let currentY = 0;
  return wire.map(wireSegment => {
    const count = parseInt(wireSegment.substr(1));
    const dir = wireSegment.charAt(0);
    return [...Array(count)].map(() => {
      switch (dir) {
        case 'R':
          currentX += 1;
          break;
        case 'L':
          currentX -= 1;
          break;
        case 'U':
          currentY += 1;
          break;
        case 'D':
          currentY -= 1;
          break;
      }
      return `${currentX},${currentY}`;
    });
  }).flat();
};
