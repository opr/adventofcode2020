import {takeWhile, last, find} from 'iter-tools/es2018';
import {readFileToString} from '../utils/readFileToString';

export const taskEight = () => {
  const input = readFileToString('./challenges/inputs/8.txt');
  const image1 = produceImage(25, 6, input);
  //find layer
  let layerWithFewestZeroes = 0;
  let lowestNumberOfZeroes = 9999999;
  image1.forEach((layer, index) => {
    const zeroes = layer.filter(x => x === 0).length;
    //console.log('checking how many 0s are in layer', index, 'there are', zeroes);
    layerWithFewestZeroes = zeroes < lowestNumberOfZeroes ? index : layerWithFewestZeroes;
    lowestNumberOfZeroes = Math.min(zeroes, lowestNumberOfZeroes);
  });
  const numberOfOnes = image1[layerWithFewestZeroes].filter(x => x === 1).length;
  const numberOfTwos = image1[layerWithFewestZeroes].filter(x => x === 2).length;
  const answer = numberOfOnes * numberOfTwos;
  console.log('Task 8 part 1', answer);
  drawImage(resolveFinalPixelValues(image1, 25, 6), 25, 6);
};

export const drawImage = (pixelValues, width, height) => {
  let lines = '';
  for (let i = 0; i < pixelValues.length; i++) {
    lines += pixelValues[i] === 0 ? '       ' : 'darwin ';
    if (i % (width) === width - 1) {
      lines += '\n';
    }
  }
  console.log(lines);
};

export const resolveFinalPixelValues = (layers, width: number, height: number) => {
  const finalImage = [];
  const imageLength = width * height;

  for (let i = 0; i < imageLength; i++) {
    const firstMatchingLayer = find(x => x[i] < 2, layers);
    finalImage[i] = firstMatchingLayer[i];
  }

  return finalImage;
};

export const produceImage = (width: number, height: number, input: string): Array<Array<number>> => {
  const splitAt = width * height;
  const layers = [];
  const inputArray = Array.from(input);
  let currentIndex = 0;
  do {
    layers.push(Array.from(input.slice(currentIndex, currentIndex + splitAt)).map(x => parseInt(x)));
    currentIndex += splitAt;
  }
  while (currentIndex + splitAt <= inputArray.length);
  return layers;
};

