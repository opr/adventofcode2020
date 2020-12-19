import {expect} from 'chai';
import {calculateFuelForMass, calculateFuelForMassWithCompoundFuel} from '../1';
import {
  doesNumberContainDoubleDigit,
  doesNumberDecrease,
  doesSequenceContainUniqueDoubleDigits,
  findDoubleDigits
} from '../4';

describe('Task four', () => {
  it('Tells you if a number decreases', () => {
    expect(doesNumberDecrease(111111)).to.be.false;
    expect(doesNumberDecrease(23450)).to.be.true;
    expect(doesNumberDecrease(353302)).to.be.true;
  });

  it('tells you if a number contains a double digit', () => {
    expect(doesNumberContainDoubleDigit(111111)).to.be.true;
    expect(doesNumberContainDoubleDigit(23450)).to.be.false;
  });

  it('finds double digits', () => {
    expect(findDoubleDigits(123445)).to.deep.equal([44]);
    expect(findDoubleDigits(129097599245)).to.deep.equal([99]);
    expect(findDoubleDigits(1290977599245)).to.deep.equal([99, 77]);
    expect(findDoubleDigits(788899)).to.deep.equal([99, 88, 88]);
    expect(findDoubleDigits(799999)).to.deep.equal([99, 99, 99, 99]);
  });

  it('tells if double digits are unique', () => {
    expect(doesSequenceContainUniqueDoubleDigits([22])).to.be.true;
    expect(doesSequenceContainUniqueDoubleDigits([22, 33, 44])).to.be.true;
    expect(doesSequenceContainUniqueDoubleDigits([22, 33, 44, 44])).to.be.true;
    expect(doesSequenceContainUniqueDoubleDigits([99, 88, 88])).to.be.true;
    expect(doesSequenceContainUniqueDoubleDigits([99, 99, 99, 99])).to.be.false;
  });
});
