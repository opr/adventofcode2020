import {readFileToString} from '../utils/readFileToString';

export const taskFour = () => {
  const [from, to] = readFileToString('./challenges/inputs/4.txt').split('-').map(x => parseInt(x));

  let partOneCounter = 0;
  let partTwoCounter = 0;

  for (let i = from; i <= to; i++) {
    if (!doesNumberDecrease(i) && doesNumberContainDoubleDigit(i)) {
      partOneCounter++;

      if (doesSequenceContainUniqueDoubleDigits(findDoubleDigits(i))) {
        partTwoCounter++;
      }
    }
  }
  console.log('part one answer =', partOneCounter);
  console.log('part two answer =', partTwoCounter);
};

export const workThroughNumber = (number_: number, evaluator: Function) => {
  let number = number_;
  let lastDigit = number % 10;
  while (number > 0) {
    number = (number - lastDigit) / 10;
    const nextLastDigit = number % 10;
    if (evaluator(lastDigit, nextLastDigit) === true) {
      return true;
    }
    lastDigit = nextLastDigit;
  }
  return false;
};


export const findDoubleDigits = (number_: number): Array<number> => {
  let number = number_;
  const doubleDigits = [];
  let lastDigit = number % 10;
  //console.log('need to check', number);
  while (number > 0) {
    number = (number - lastDigit) / 10;
    const nextLastDigit = number % 10;
    if (lastDigit === nextLastDigit) {
      doubleDigits.push((nextLastDigit * 10) + lastDigit);
    }
    lastDigit = nextLastDigit;
  }
  return doubleDigits;
};

export const doesSequenceContainUniqueDoubleDigits = (doubleDigits: Array<number>): boolean => {

  if (doubleDigits.length === new Set(doubleDigits).size) {
    return true;
  }

  return doubleDigits.filter(x => doubleDigits.reduce((a, e, i) => {
    if (e === x) {
      a.push(i);
    }
    return a;
  }, []).length === 1).length > 0;

};

export const doesNumberDecrease = (number_: number): boolean => {
  return workThroughNumber(number_, (a, b) => a < b);
};

export const doesNumberContainDoubleDigit = (number_: number): boolean => {
  return workThroughNumber(number_, (a, b) => a == b);
};
