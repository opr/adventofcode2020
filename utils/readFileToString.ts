import {readFileSync, existsSync} from 'fs';

export const readFileToString = (filename: string): string => {
    if(existsSync(filename)) {
        return readFileSync(filename, {encoding: 'utf-8'});
    }
    console.warn('Error reading file');
    return '';
};