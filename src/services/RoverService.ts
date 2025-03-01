import { Plateau } from "../models/Plateau";
import { Rover } from "../models/Rover";

export class RoverService {
  private plateau: Plateau;

  constructor(maxX: number, maxY: number) {
    this.plateau = new Plateau(maxX, maxY);
  }

  processRovers(roverInputs: string[]): string[] {
    const results: string[] = [];

    for(let i = 0; i < roverInputs.length; i += 2) {
      const [x, y, direction] = roverInputs[i].split(' ');
      const instructions = roverInputs[i + 1];

      const rover = new Rover(Number(x), Number(y), direction, this.plateau);

      this.plateau.addRover(rover);

      for(const instruction of instructions) {
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
              throw new Error(`Invalid instruction: ${instruction}`)
          }
        } catch (error) {
          throw error;
        }
      }
      results.push(rover.getPositionAsString());
    }

    return results;
  }
}