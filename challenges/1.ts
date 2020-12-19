//https://adventofcode.com/2019/day/1

import {readFileToString} from '../utils/readFileToString';

export const taskOne = () => {
    const input = readFileToString('./challenges/inputs/1.txt');
    const masses = input.split('\r\n').map(x => parseInt(x));
    const calculatedFuelForPartOne = masses.reduce((accumulator, currentValue) => accumulator + calculateFuelForMass(currentValue), 0);
    const calculatedFuelForPartTwo = masses.reduce((accumulator, currentValue) => accumulator + calculateFuelForMassWithCompoundFuel(currentValue), 0);
    console.log('Part 1:', calculatedFuelForPartOne);
    console.log('Part 2:', calculatedFuelForPartTwo);
};

export const calculateFuelForMass = (mass: number) => Math.floor(mass / 3) - 2;

export const calculateFuelForMassWithCompoundFuel = (fuelAmount: number): number => {
    const fuelRequired = Math.floor(fuelAmount / 3) - 2;
    if (fuelRequired < 0) {
        return 0;
    }
    return calculateFuelForMassWithCompoundFuel(fuelRequired) + fuelRequired;
};
