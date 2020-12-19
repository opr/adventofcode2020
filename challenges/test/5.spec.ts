import {expect} from 'chai';
import 'mocha';
import {getParameterModes, getRealOpcode, consumeOpcodeAt, runProgramme} from '../5';

describe('task 5', () => {
  it('gets correct opcode from long opcode number', () => {
    expect(getRealOpcode(1002)).to.equal(2);
    expect(getRealOpcode(1004)).to.equal(4);
    expect(getRealOpcode(2)).to.equal(2);
    expect(getRealOpcode(1)).to.equal(1);
    expect(getRealOpcode(1001)).to.equal(1);
    expect(getRealOpcode(10099)).to.equal(99);
  });

  it('gets correct paramters', () => {
    expect(getParameterModes(1002)).to.deep.equal([0,1,0]);
    expect(getParameterModes(11002)).to.deep.equal([0,1,1]);
    expect(getParameterModes(45602)).to.deep.equal([6,5,4]);
    expect(getParameterModes(3)).to.deep.equal([0,0,0]);
  });

  it('consumes opcode 1', () => {
    const testProgramme = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
    consumeOpcodeAt(0, testProgramme);
    expect(testProgramme[3]).to.equal(70);
  });

  it('consumes opcode 2', () => {
    const testProgramme = [
      1, 9, 10, 3,
      2, 3, 11, 0,
      99,
      30, 40, 50
    ];
    consumeOpcodeAt(0, testProgramme);
    expect(testProgramme[3]).to.equal(70);

    consumeOpcodeAt(4, testProgramme);
    expect(testProgramme[0]).to.equal(3500);
  });

  it('runs a programme and gives expected output', () => {
    const testProgramme = [1,0,0,0,99];
    expect(runProgramme(testProgramme)).to.deep.equal([2,0,0,0,99]);
    const testProgramme2 = [2,3,0,3,99];
    expect(runProgramme(testProgramme2)).to.deep.equal([2,3,0,6,99]);
    const testProgramme3 = [2,4,4,5,99,0];
    expect(runProgramme(testProgramme3)).to.deep.equal([2,4,4,5,99,9801]);
    const testProgramme4 = [1,1,1,4,99,5,6,0,99];
    expect(runProgramme(testProgramme4)).to.deep.equal([30,1,1,4,2,5,6,0,99]);
    const testProgramme5 = [1002,4,3,4,33];
    expect(runProgramme(testProgramme5)).to.deep.equal([1002,4,3,4,99]);

    const testProgramme6 = [3,0,4,0,99];
    expect(runProgramme(testProgramme6, 5)).to.deep.equal({programme: [5,0,4,0,99], output: 5});
  });

  it('handles negative numbers', () => {
    const testProgramme = [1101,100,-1,4,0];
    expect(runProgramme(testProgramme)).to.deep.equal([1101,100,-1,4,99]);
  });

  it('handles opcode 5', () => {
    const testProgramme = [1105, 0, 3, 11101, 2, 7, 5, 99];
    expect(runProgramme(testProgramme)).to.deep.equal([1105, 0, 3, 11101, 2, 9, 5, 99]);
    const testProgramme2 = [1105, 4, 4, 0, 11101, 2, 7, 6, 99];
    expect(runProgramme(testProgramme2)).to.deep.equal([1105, 4, 4, 0, 11101, 2, 9, 6, 99]);
  });

  it('handles opcode 6', () => {
    const testProgramme = [1106, 0, 3, 11101, 2, 7, 5, 99];
    expect(runProgramme(testProgramme)).to.deep.equal([1106, 0, 3, 11101, 2, 9, 5, 99]);
    const testProgramme2 = [1106, 1, 3, 11101, 2, 7, 5, 99];
    expect(runProgramme(testProgramme2)).to.deep.equal([1106, 1, 3, 11101, 2, 9, 5, 99]);
    const testProgramme3 = [1106, 0, 7, 11101, 2, 7, 5, 99];
    expect(runProgramme(testProgramme3)).to.deep.equal([1106, 0, 7, 11101, 2, 7, 5, 99]);
  });

  it('handles opcode 7', () => {
    const testProgramme = [1107, 0, 3, 6, 11101, 2, 1, 7, 99];
    expect(runProgramme(testProgramme)).to.deep.equal([1107, 0, 3, 6, 11101, 2, 1, 3, 99]);
    const testProgramme2 = [1107, 3, 0, 6, 11101, 2, 1, 7, 99];
    expect(runProgramme(testProgramme2)).to.deep.equal([1107, 3, 0, 6, 11101, 2, 0, 2, 99]);
  });

  it('handles opcode 8', () => {
    const testProgramme = [1108, 3, 3, 6, 11101, 2, 1, 7, 99];
    expect(runProgramme(testProgramme)).to.deep.equal([1108, 3, 3, 6, 11101, 2, 1, 3, 99]);
    const testProgramme2 = [1108, 3, 0, 6, 11101, 2, 1, 7, 99];
    expect(runProgramme(testProgramme2)).to.deep.equal([1108, 3, 0, 6, 11101, 2, 0, 2, 99]);
  });

  it('handles test inputs from AoC', () => {
    const testProgramme = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9];
    expect(runProgramme(testProgramme, 34)).to.have.property('output', 1);
    const testProgramme2 = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9];
    expect(runProgramme(testProgramme2, 0)).to.have.property('output', 0);
    const testProgramme3 = [3,9,7,9,10,9,4,9,99,-1,8];
    expect(runProgramme(testProgramme3, 0)).to.have.property('output', 1);
    const testProgramme4 = [3,9,7,9,10,9,4,9,99,-1,8];
    expect(runProgramme(testProgramme4, 8)).to.have.property('output', 0);
    const testProgramme5 = [3,9,7,9,10,9,4,9,99,-1,8];
    expect(runProgramme(testProgramme5, 9)).to.have.property('output', 0);
    const testProgramme6 = [3,3,1108,-1,8,3,4,3,99];
    expect(runProgramme(testProgramme6, 8)).to.have.property('output', 1);
    const testProgramme7 = [3,3,1108,-1,8,3,4,3,99];
    expect(runProgramme(testProgramme7, 78)).to.have.property('output', 0);
    const testProgramme8 = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
      1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
      999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
    expect(runProgramme(testProgramme8, 8)).to.have.property('output', 1000);
    const testProgramme9 = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
      1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
      999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
    expect(runProgramme(testProgramme9, 9)).to.have.property('output', 1001);
    const testProgramme10 = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
      1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
      999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
    expect(runProgramme(testProgramme10, 7)).to.have.property('output', 999);
  });

});
