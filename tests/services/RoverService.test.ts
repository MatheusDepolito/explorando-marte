import path from 'path';
import { RoverService } from '../../src/services/RoverService';
import fs from 'fs';
describe('RoverService', () => {
  const testFilesDir = path.join(__dirname, 'testFiles');

  beforeAll(() => {
    if (!fs.existsSync(testFilesDir)) {
      fs.mkdirSync(testFilesDir);
    }
  });

  afterAll(() => {
    if (fs.existsSync(testFilesDir)) {
      fs.rmSync(testFilesDir, { recursive: true });
    }
  });

  it('should process a valid file correctly', () => {
    const filePath = path.join(testFilesDir, 'validInput.txt');
    const fileContent = `
     5 5
     1 2 N
     LMLMLMLMM
     3 3 E
     MMRMMRMRRM
    `;

    fs.writeFileSync(filePath, fileContent.trim());

    const roverService = new RoverService(0, 0);

    const results = roverService.processRoversFromFile(filePath);

    expect(results).toEqual(['1 3 N', '5 1 E']);
  });

  it('should throw an error for an empty file', () => {
    const filePath = path.join(testFilesDir, 'emptyInput.txt');
    fs.writeFileSync(filePath, '');

    const roverService = new RoverService(0, 0);

    expect(() => roverService.processRoversFromFile(filePath)).toThrow(
      'O arquivo deve conter pelo menos uma linha com o tamanho do planalto.',
    );
  });

  it('should throw an error for invalid plateau size', () => {
    const filePath = path.join(testFilesDir, 'invalidPlateauSize.txt');
    const fileContent = `
     5 5
     1 2 N
     INVALID
    `;

    fs.writeFileSync(filePath, fileContent.trim());

    const roverService = new RoverService(0, 0);

    expect(() => roverService.processRoversFromFile(filePath)).toThrow(
      'Invalid instruction: I',
    );
  });

  it('should throw an error for collisions', () => {
    const roverService = new RoverService(5, 5);
    const roverInputs = [
      '1 2 N', // Primeira sonda
      'M', // Movo ela
      '1 2 N', // Segunda sonda no local que a primeira foi iniciada antes de eu dar o comando de se mover
      'M', // Movo ela para o lugar que movi a primeira
    ];
    expect(() => roverService.processRovers(roverInputs)).toThrow(
      'Invalid movement: (1, 3) is already occupied.',
    );
  });
});
