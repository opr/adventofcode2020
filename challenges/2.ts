import {readFileToString} from '../utils/readFileToString';

export const taskTwo = () => {
    const input = readFileToString('./challenges/inputs/2.txt').split(',').map(x => parseInt(x));

    const partOneInput = Array.from(input);
    partOneInput[1] = 12;
    partOneInput[2] = 2;

    //output for part one
    console.log(runProgramme(partOneInput)[0]);

    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            const inputCopy = Array.from(input);
            inputCopy[1] = noun;
            inputCopy[2] = verb;
            if (runProgramme(inputCopy)[0] === 19690720) {
                console.log(100 * noun + verb);
            }
        }
    }
};

export const runProgramme = (programme: Array<number>) => {
    let hcf = false;
    let instruction = 0;
    do {
        hcf = consumeOpcodeAt(instruction, programme);
        instruction += 4;
        if (hcf) {
            return programme;
        }
    }
    while (!hcf);
};

export const consumeOpcodeAt = (index: number, programmeIn: Array<number>) => {
    const programme = programmeIn;
    const opcode = programme[index];

    if (opcode === 99) {
        return true;
    }

    const insertPosition = programme[index + 3];
    const programmeArgs = [programme[programme[index + 1]], programme[programme[index + 2]]];

    if (opcode === 1) {
        programme[insertPosition] = programmeArgs[0] + programmeArgs[1];
    }

    if (opcode === 2) {
        programme[insertPosition] = programmeArgs[0] * programmeArgs[1];
    }

};