import { RoverService } from './services/RoverService';

const input = ['5 5', '1 2 N', 'LMLMLMLMM', '3 3 E', 'MMRMMRMRRM'];

const [ plateauSize, ...roverInputs ] = input;
const [maxX, maxY] = plateauSize.split(' ').map(Number);

const roverService = new RoverService(maxX, maxY);

const results = roverService.processRovers(roverInputs);

console.log(results);