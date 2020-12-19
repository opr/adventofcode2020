import {readFileToString} from '../utils/readFileToString';

export const taskFive = () => {
  const input = readFileToString('./challenges/inputs/5.txt').split(',').map(x => parseInt(x));

  console.log('---level5---');
  const partOneInput = Array.from(input);
  console.log(runProgramme(partOneInput, 1, true));

  const partTwoInput = Array.from(input);
  console.log(runProgramme(partTwoInput, 5));
};

interface OpcodeResult {
  halt?: boolean,
  jump: number,
  overwriteInstruction?: number,
  output?: number
}

export const runProgramme = (programme: Array<number>, input = 0, ignoreOutput = false) => {
  let opcodeResult: OpcodeResult = {jump: 4, halt: false};
  let instruction = 0;
  let output = undefined;
  do {
    if (programme[instruction] === 225) {
      return;
    }
    opcodeResult = consumeOpcodeAt(instruction, programme, input);
    instruction += opcodeResult.jump;
    if (opcodeResult.output !== undefined) {
      output = opcodeResult.output;
    }
    if (opcodeResult.overwriteInstruction) {
      instruction = opcodeResult.overwriteInstruction;
    }
    if (opcodeResult.halt || (opcodeResult.output >= 0 && ignoreOutput === false)) {
      return output >= 0 ? {programme, output} : programme;
    }
  }
  while (!opcodeResult.halt);
};

export const getRealOpcode = (opcode: number): number => (opcode % 100);

export const getParameterModes = (_opcode: number): Array<number> => {
  let opcode = _opcode;
  const returnValues = [0, 0, 0];
  opcode = (opcode - opcode % 10) / 100;
  returnValues[0] = opcode % 10;
  opcode = (opcode - opcode % 10) / 10;
  returnValues[1] = opcode % 10;
  opcode = (opcode - opcode % 10) / 10;
  returnValues[2] = opcode % 10;
  return returnValues;
};

export const consumeOpcodeAt = (index: number, programmeIn: Array<number>, input = 0): OpcodeResult => {
  const programme = programmeIn;
  const opcodeInstruction = programme[index];
  const opcode = getRealOpcode(opcodeInstruction);
  let jump = 0;

  if (opcode === 99) {
    return {jump, halt: true};
  }

  const parameterModes = getParameterModes(opcodeInstruction);

  const opcodeArgs = [
    parameterModes[0] === 0 ? programme[programme[index + 1]] : programme[index + 1],
    parameterModes[1] === 0 ? programme[programme[index + 2]] : programme[index + 2],
    parameterModes[2] === 0 ? programme[index + 3] : programme[index + 3]
  ];

  if (opcode === 21) {
    return;
  }

  if (opcode === 1) {
    programme[opcodeArgs[2]] = opcodeArgs[0] + opcodeArgs[1];
    jump = 4;
  }

  if (opcode === 2) {
    programme[opcodeArgs[2]] = opcodeArgs[0] * opcodeArgs[1];
    jump = 4;
  }

  if (opcode === 3) {
    programme[programme[index + 1]] = input;
    jump = 2;
  }

  if (opcode === 4) {
    return {jump: 2, output: opcodeArgs[0]};
  }

  if (opcode === 5) {
    if (opcodeArgs[0] > 0) {
      return {jump, halt: false, overwriteInstruction: opcodeArgs[1]};
    }
    jump = 3;
  }

  if (opcode === 6) {
    if (opcodeArgs[0] === 0) {
      return {jump, halt: false, overwriteInstruction: opcodeArgs[1]};
    }
    jump = 3;
  }

  if (opcode === 7) {

    const indexToUpdate = parameterModes[2] === 0 ? opcodeArgs[2] : opcodeArgs[2];

    programme[indexToUpdate] = 0;

    if (opcodeArgs[0] < opcodeArgs[1]) {
      programme[indexToUpdate] = 1;
    }
    jump = 4;
  }

  if (opcode === 8) {
    programme[opcodeArgs[2]] = 0;

    if (opcodeArgs[0] === opcodeArgs[1]) {
      programme[opcodeArgs[2]] = 1;
    }
    jump = 4;
  }

  return {jump, halt: false};
};
