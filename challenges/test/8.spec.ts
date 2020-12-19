import {expect} from 'chai';
import 'mocha';
import {produceImage, resolveFinalPixelValues} from '../8';

describe('task 8', () => {
  it('produces an array of length a where a is the result of (input length / (width*height)) of the image', () => {
    expect(produceImage(3, 2, '123456789012')).to.deep.equal([[1,2,3,4,5,6],[7,8,9,0,1,2]]);
  });
  it('resolves final pixel values', () => {
    const layers = produceImage(2,2, '0222112222120000');
    //console.log(layers);
    const finalPixels = resolveFinalPixelValues(layers, 2,2);
    console.log(finalPixels);
  });
});
