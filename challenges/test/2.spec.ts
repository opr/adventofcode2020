import {expect} from 'chai';
import 'mocha';
import {consumeOpcodeAt, runProgramme} from '../2';

describe('task 2', () => {
    it('consumes opcode 1', () => {
        const testProgramme = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
        consumeOpcodeAt(0, testProgramme);
        expect(testProgramme[3]).to.equal(70);
    });
    it('consumes opcode 2', () => {
        const testProgramme = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
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
    });
});