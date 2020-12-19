import {expect} from 'chai';
import 'mocha';
import {findIntersections, findShortestDistance, generateCoordinatesOccupiedByWire} from '../3';
import chai from 'chai';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';
chai.use(deepEqualInAnyOrder);


describe('task 3', () => {
  it('generates coordinates occupied by a wire', () => {
    const input = ['R3', 'U2', 'L1', 'U1'];
    expect(generateCoordinatesOccupiedByWire(input)).to.deep.equal([
      '1,0',
      '2,0',
      '3,0',
      '3,1',
      '3,2',
      '2,2',
      '2,3'
    ]);
  });

  it('finds intersections', () => {
    const wireA = [
      '1,2',
      '2,25',
      '12,23',
      '18,2',
    ];
    const wireB = [
      '13,2',
      '29,25',
      '192,23',
      '18,2',
    ];
    expect(findIntersections(wireA, wireB)).to.deep.equal(['18,2']);
    const wireA1 = [
      '1,2',
      '2,25',
      '12,23',
      '18,2',
      '5,5'
    ];
    const wireB1 = [
      '13,2',
      '29,25',
      '192,23',
      '18,2',
      '5,5'
    ];
    // @ts-ignore
    expect(findIntersections(wireA1, wireB1)).to.deep.equalInAnyOrder(['18,2', '5,5']);
  });

  it('finds the shortest distance', () => {

    const wireA = ['R8', 'U5', 'L5', 'D3'];
    const wireB = ['U7', 'R6', 'D4', 'L4'];
    const wireACoords = generateCoordinatesOccupiedByWire(wireA);
    const wireBCoords = generateCoordinatesOccupiedByWire(wireB);
    const intersections = findIntersections(wireACoords, wireBCoords);
    const shortestDistance = findShortestDistance(intersections);
    expect(shortestDistance).to.equal(6);

    const wireA1 = ['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'];
    const wireB1 = ['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7'];
    const wireACoords1 = generateCoordinatesOccupiedByWire(wireA1);
    const wireBCoords1 = generateCoordinatesOccupiedByWire(wireB1);
    const intersections1 = findIntersections(wireACoords1, wireBCoords1);
    const shortestDistance1 = findShortestDistance(intersections1);
    expect(shortestDistance1).to.equal(135);


    const wireA2 = ['R75','D30','R83','U83','L12','D49','R71','U7','L72'];
    const wireB2 = ['U62','R66','U55','R34','D71','R55','D58','R83'];
    const wireACoords2 = generateCoordinatesOccupiedByWire(wireA2);
    const wireBCoords2 = generateCoordinatesOccupiedByWire(wireB2);
    const intersections2 = findIntersections(wireACoords2, wireBCoords2);
    if(intersections2) {
      const shortestDistance2 = findShortestDistance(intersections2);
      expect(shortestDistance2).to.equal(159);
    }
  });
});
