import {readFileToString} from '../utils/readFileToString';

interface OrbitDescription {
  orbitedBy: Array<string>,
  body: string
}

export const taskSix = () => {
  const input = readFileToString('./challenges/inputs/6.txt').split('\r\n');
  const orbits: Array<OrbitDescription> = [];

  input.forEach(orbit => {
    const [body, orbitedBy] = orbit.split(')');
    const indexOfExistingBody = orbits.findIndex((x: OrbitDescription) => x.body === body);
    const indexOfExistingSatellite = orbits.findIndex((x: OrbitDescription) => x.body === orbitedBy);

    if (indexOfExistingSatellite === -1) {
      orbits.push({body: orbitedBy, orbitedBy: []});
    }

    if (indexOfExistingBody !== -1) {
      orbits[indexOfExistingBody].orbitedBy.push(orbitedBy);
    } else {
      orbits.push({orbitedBy: [orbitedBy], body});
    }
  });
  console.log(orbits);

  const allOrbits = orbits.reduce((a, v, i) => {
    const count = countOrbitsForBody(v.body, orbits);
    //console.log('looking up orbits for', v.body, 'it orbits', count);
    return a + count;
  }, 0);

  console.log('answer to part 1:', allOrbits);

  console.log('answer to part 2:', findJumpsBetweenBodies('YOU', 'SAN', orbits));

};

const findJumpsBetweenBodies = (from: string, to: string, orbits: Array<OrbitDescription>) => {
  const commonBody = findClosestCommonBody(from, to, orbits);
  //console.log('common body is', commonBody);
  const distanceFromYou = getDistanceToBody('YOU', commonBody, orbits);
  const distanceFromSan = getDistanceToBody('SAN', commonBody, orbits);
  const totalJumps = distanceFromSan + distanceFromYou - 2;
  return totalJumps;
};

const findClosestCommonBody = (objectA: string, objectB: string, orbits: Array<OrbitDescription>) => {
  const bodiesByA = new Set(getListOfBodiesOrbitedByBody(objectA, orbits, null));
  const bodiesByB = new Set(getListOfBodiesOrbitedByBody(objectB, orbits, null));

  console.log(bodiesByA, bodiesByB);

  const intersection = new Set([...bodiesByA].filter(x => bodiesByB.has(x)));
  console.log(intersection);

  return Array.from(intersection)[0];
};

const getDistanceToBody = (from: string, to: string, orbits: Array<OrbitDescription>, _counter = 0) => {
  //console.log('getting distance between', from, 'and', to);
  let counter = _counter;
  //console.log('looking up orbits for', body);
  const indexOfPrimary = orbits.findIndex((o: OrbitDescription) => o.orbitedBy.indexOf(from) >= 0);
  //console.log('index of primary, orbited by', from, 'is', indexOfPrimary, 'its body name is', orbits[indexOfPrimary].body);
  if (from === 'COM') {
    return 0;
  }
  if (orbits[indexOfPrimary].body !== 'COM' && orbits[indexOfPrimary].body !== to) {
    counter += getDistanceToBody(orbits[indexOfPrimary].body, to, orbits, counter);
  }
  return counter + 1;
};

const getListOfBodiesOrbitedByBody = (body: string, orbits: Array<OrbitDescription>, _list: string) => {
  let list = _list;
  const isFirst = list === null;
  if (isFirst) {
    list = '';
  }
  //console.log('looking up bodies orbited by', body, 'appending to', list);
  const indexOfPrimary = orbits.findIndex((o: OrbitDescription) => o.orbitedBy.indexOf(body) >= 0);
  if (orbits[indexOfPrimary].body !== 'COM') {
    list += `${getListOfBodiesOrbitedByBody(orbits[indexOfPrimary].body, orbits, list)},`;
  }
  return isFirst ? (list + body).split(',').reverse() : list + body;
};

export const countOrbitsForBody = (body: string, orbits: Array<OrbitDescription>, _counter: number = 0) => {
  let counter = _counter;
  //console.log('looking up orbits for', body);
  const indexOfPrimary = orbits.findIndex((o: OrbitDescription) => o.orbitedBy.indexOf(body) >= 0);
  if (body === 'COM') {
    return 0;
  }
  if (orbits[indexOfPrimary].body !== 'COM') {
    counter += countOrbitsForBody(orbits[indexOfPrimary].body, orbits, counter);
  }
  return counter + 1;
};
