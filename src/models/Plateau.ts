import { Rover } from './Rover';

export class Plateau {
  private occupiedPositions: Set<string> = new Set();
  private rovers: Rover[] = [];

  constructor(
    private readonly maxX: number,
    private readonly maxY: number,
  ) {}

  isPositionValid(x: number, y: number): boolean {
    return x >= 0 && x <= this.maxX && y >= 0 && y <= this.maxY;
  }

  isPositionOccupied(x: number, y: number): boolean {
    return this.occupiedPositions.has(`${x},${y}`);
  }

  occupyPosition(x: number, y: number): void {
    this.occupiedPositions.add(`${x},${y}`);
  }

  freePosition(x: number, y: number): void {
    this.occupiedPositions.delete(`${x},${y}`);
  }

  addRover(rover: Rover): void {
    const { x, y } = rover.getPosition();

    if (this.isPositionOccupied(x, y)) {
      throw new Error(`Position (${x}, ${y}) is already occupied`);
    }

    this.rovers.push(rover);
    this.occupyPosition(x, y);
  }
}
