import {readFileToString} from '../utils/readFileToString';

export const taskNine = () => {
  const input = readFileToString('./challenges/inputs/9.txt').split(',').map(x => parseInt(x));

  console.log('---level9---');
  runProgramme(Array.from(input), 1, false);
  console.log('---level9 part 2---');
  runProgramme(Array.from(input), 2, false);

};

interface ProgrammeResult {
  output?,
  programme?,
  instruction?: number,
  halted?: boolean
}

interface OpcodeResult {
  halt?: boolean,
  jump: number,
  adjustRelativeBase?: number
  overwriteInstruction?: number,
  output?: number,
  inputConsumed?: boolean
}

export const runWithPermutation = (input: Array<number>, permutation, loop: boolean = false) => {

  const partOneInputA = Array.from(input);
  const partOneInputB = Array.from(input);
  const partOneInputC = Array.from(input);
  const partOneInputD = Array.from(input);
  const partOneInputE = Array.from(input);


  if (!loop) {
    const resultA = runProgramme(partOneInputA, 0, true, permutation[0]);
    const outputA = resultA.output;
    const resultB = runProgramme(partOneInputB, outputA, true, permutation[1]);
    const outputB = resultB.output;
    const resultC = runProgramme(partOneInputC, outputB, true, permutation[2]);
    const outputC = resultC.output;
    const resultD = runProgramme(partOneInputD, outputC, true, permutation[3]);
    const outputD = resultD.output;
    const resultE = runProgramme(partOneInputE, outputD, true, permutation[4]);
    const outputE = resultE.output;

    return outputE;
  }


  let haltedA = false;
  let haltedB = false;
  let haltedC = false;
  let haltedD = false;
  let haltedE = false;
  let instructionA = 0;
  let instructionB = 0;
  let instructionC = 0;
  let instructionD = 0;
  let instructionE = 0;

  const resultA = runProgramme(partOneInputA, 0, false, permutation[0], 'A');
  let outputA = resultA.output;
  haltedA = resultA.halted;
  instructionA = resultA.instruction;

  console.log('A halted', haltedA);
  let includeA = false;
  let outputB = 0;
  let outputC = 0;
  let outputD = 0;
  let outputE: number | ProgrammeResult = 0;

  let a = 0;

  do {
    a++;
    if (includeA) {
      console.log('looping back to 1');
      // @ts-ignore
      const resultA = runProgramme(partOneInputA, outputE, false, permutation[0], 'A', instructionA);

      if (haltedA) {
        console.log('A halted');
        const x = 1;
      }

      haltedA = haltedA ? haltedA : resultA.halted;
      outputA = haltedA ? outputA : resultA.output;
      instructionA = resultA.instruction;
      console.log('A halted = ', haltedA);
    }

    const resultB = runProgramme(partOneInputB, outputA, false, permutation[1], 'B', instructionB);
    haltedB = haltedB ? haltedB : resultB.halted;
    outputB = haltedB ? outputB : resultB.output;
    instructionB = resultB.instruction;
    console.log('B halted = ', haltedB);

    const resultC = runProgramme(partOneInputC, outputB, false, permutation[2], 'C', instructionC);
    haltedC = haltedC ? haltedC : resultC.halted;
    outputC = haltedC ? outputC : resultC.output;
    instructionC = resultC.instruction;
    console.log('C halted = ', haltedC);

    const resultD = runProgramme(partOneInputD, outputC, false, permutation[3], 'D', instructionD);
    haltedD = haltedD ? haltedD : resultD.halted;
    outputD = haltedD ? outputD : resultD.output;
    instructionD = resultD.instruction;
    console.log('D halted = ', haltedD);

    const resultE = runProgramme(partOneInputE, outputD, false, permutation[4], 'E', instructionE);
    haltedE = haltedE ? haltedE : resultE.halted;
    outputE = haltedE ? outputE : resultE.output;
    instructionE = resultE.instruction;
    console.log('E halted = ', haltedE);

    includeA = true;
    console.log(outputE);
    console.log(haltedA, haltedB, haltedC, haltedD, haltedE);
  } while (a < 10 && !(haltedA && haltedB && haltedC && haltedD && haltedE));
  return outputE;

};

const permute = (input) => {

  const permArr = [];
  const usedChars = [];

  const x = (input) => {
    let ch;
    for (let i = 0; i < input.length; i++) {     //   loop over all elements
      ch = input.splice(i, 1)[0];            //1. pull out each element in turn
      usedChars.push(ch);                    //   push this element
      if (input.length == 0) {               //2. if input is empty, we pushed every element
        permArr.push(usedChars.slice());   //   so add it as a permutation
      }
      x(input);                        //3. compute the permutation of the smaller array
      input.splice(i, 0, ch);                //4. add the original element to the beginning
                                             //   making input the same size as when we started
                                             //   but in a different order
      usedChars.pop();                       //5. remove the element we pushed
    }
    return permArr;                           //return, but this only matters in the last call
  };

  return x(input);
};

export const runProgramme = (programme: Array<number>, input = 0, haltOnOutput = false, phaseSetting = 0, letter = '', startingInstruction = 0, skipPhase: boolean = true): ProgrammeResult => {
  let opcodeResult: OpcodeResult = {jump: 4, halt: false};
  let instruction = startingInstruction;
  let phaseOrInput = skipPhase ? 'input' : startingInstruction > 0 ? 'input' : 'phase';
  let relativeBase = 0;
  let output = undefined;
  do {
    if (programme[instruction] === 225) {
      return;
    }
    opcodeResult = consumeOpcodeAt(instruction, programme, input, phaseSetting, phaseOrInput, letter, haltOnOutput, relativeBase);
    instruction += opcodeResult.jump;
    if (opcodeResult.output !== undefined) {
      output = opcodeResult.output;
    }
    if (opcodeResult.inputConsumed && phaseOrInput === 'phase') {
      phaseOrInput = 'input';
    }
    if (opcodeResult.overwriteInstruction) {
      instruction = opcodeResult.overwriteInstruction;
    }
    if (opcodeResult.adjustRelativeBase) {
      relativeBase = relativeBase + opcodeResult.adjustRelativeBase;
    }
    if ((opcodeResult.halt || opcodeResult.output >= 0)) {
      console.log('returning result for', letter, output, 'it was halted = ', opcodeResult.halt);

      if(opcodeResult.halt) {
        return output >= 0 && opcodeResult.halt ? {programme, output, halted: opcodeResult.halt, instruction} : {
          programme,
          instruction,
          output,
          halted: opcodeResult.halt
        };
      }
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

export const consumeOpcodeAt = (index: number, programmeIn: Array<number>, input = 0, phase: number, phaseOrInput: string, letter = '', haltOnOutput: boolean = false, relativeBase = 0): OpcodeResult => {
  const programme = programmeIn;
  const opcodeInstruction = programme[index];
  const opcode = getRealOpcode(opcodeInstruction);
  let jump = 0;

  if (opcode === 99) {
    console.log('programm', letter, ' was halted 99');
    return {jump, halt: true};
  }

  const parameterModes = getParameterModes(opcodeInstruction);

  const opcodeArgs = [];

  if(parameterModes[0] === 0) {
    opcodeArgs[0] = programme[programme[index + 1]];
  }
  if(parameterModes[1] === 0) {
    opcodeArgs[1] = programme[programme[index + 2]];
  }
  if(parameterModes[2] === 0) {
    opcodeArgs[2] = programme[index + 3];
  }

  if(parameterModes[0] === 1) {
    opcodeArgs[0] = programme[index + 1];
  }
  if(parameterModes[1] === 1) {
    opcodeArgs[1] = programme[index + 2];
  }
  if(parameterModes[2] === 1) {
    opcodeArgs[2] = programme[index + 3];
  }

  if(parameterModes[0] === 2) {
    opcodeArgs[0] = programme[relativeBase + programme[index + 1]];
  }
  if(parameterModes[1] === 2) {
    opcodeArgs[1] = programme[relativeBase + programme[index + 2]];
  }
  if(parameterModes[2] === 2) {
    relativeBase + index + 3;
    opcodeArgs[2] = programme[index + 3] + relativeBase;
  }

  if (opcode === 1) {
    //console.log('adding', opcodeArgs[0], 'and', opcodeArgs[1], 'putting them into index', opcodeArgs[2], 'value is', opcodeArgs[0] * opcodeArgs[1]);
    programme[opcodeArgs[2]] = opcodeArgs[0] + opcodeArgs[1];
    jump = 4;
  }
  if (opcode === 2) {
    //console.log('multiplying', opcodeArgs[0], 'and', opcodeArgs[1], 'putting them into index', opcodeArgs[2], 'value is', opcodeArgs[0] * opcodeArgs[1]);
    programme[opcodeArgs[2]] = opcodeArgs[0] * opcodeArgs[1];
    jump = 4;
  }

  if (opcode === 3) {
    console.log(opcodeInstruction, opcodeArgs);
    if (phaseOrInput === 'phase') {
      programme[opcodeArgs[2]] = phase;
    }
    if (phaseOrInput === 'input') {
      programme[opcodeArgs[2]] = input;
    }
    jump = 2;
    return {jump, inputConsumed: true, halt: false};
  }

  if (opcode === 4) {
    //console.log('halting', letter, 'because of halt on output', haltOnOutput, 'value is', opcodeArgs[0]);
    return {jump: 2, output: opcodeArgs[0], halt: haltOnOutput};
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

  if (opcode === 9) {
    return {jump: 2, halt: false, adjustRelativeBase: opcodeArgs[0]};
  }

  return {jump, halt: false};
};
