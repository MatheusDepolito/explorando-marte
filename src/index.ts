import { RoverService } from './services/RoverService';

const filePath = './input.txt';

const roverService = new RoverService(0, 0);

try {
  const results = roverService.processRoversFromFile(filePath);
  console.log(results);
} catch (error: any) {
  console.error(error.message);
}
