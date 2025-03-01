import { Plateau } from '../models/Plateau';
import { Rover } from '../models/Rover';
import fs from 'fs';

export class RoverService {
  private plateau: Plateau;

  constructor(maxX: number, maxY: number) {
    this.plateau = new Plateau(maxX, maxY);
  }

  processRovers(roverInputs: string[]): string[] {
    const results: string[] = [];

    for (let i = 0; i < roverInputs.length; i += 2) {
      const [x, y, direction] = roverInputs[i].split(' ');
      const instructions = roverInputs[i + 1];

      const rover = new Rover(Number(x), Number(y), direction, this.plateau);

      this.plateau.addRover(rover);

      for (const instruction of instructions) {
        try {
          switch (instruction) {
            case 'L':
              rover.turnLeft();
              break;
            case 'R':
              rover.turnRight();
              break;
            case 'M':
              rover.move();
              break;
            default:
              throw new Error(`Invalid instruction: ${instruction}`);
          }
        } catch (error) {
          throw error;
        }
      }
      results.push(rover.getPositionAsString());
    }

    return results;
  }

  processRoversFromFile(filePath: string): string[] {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      const lines = fileContent
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      if (lines.length < 1) {
        throw new Error(
          'O arquivo deve conter pelo menos uma linha com o tamanho do planalto.',
        );
      }

      const [maxX, maxY] = lines[0].split(' ').map(Number);

      if (isNaN(maxX) || isNaN(maxY)) {
        throw new Error(
          'O tamanho do planalto deve ser composto por dois números.',
        );
      }

      const roverService = new RoverService(maxX, maxY);

      const roverInputs = lines.slice(1);

      return roverService.processRovers(roverInputs);
    } catch (error: any) {
      throw new Error(`Erro ao processar o arquivo: ${error.message}`);
    }
  }
}
