import { Plateau } from './Plateau';

export class Rover {
  constructor(
    private x: number,
    private y: number,
    private direction: string,
    private plateau: Plateau,
  ) {}

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  move(): void {
    let newX = this.x;
    let newY = this.y;

    switch (this.direction) {
      case 'N':
        newY += 1;
        break;
      case 'S':
        newY -= 1;
        break;
      case 'E':
        newX += 1;
        break;
      case 'W':
        newX -= 1;
        break;
    }

    if (!this.plateau.isPositionValid(newX, newY)) {
      throw new Error(
        `Invalid movement: (${newX}, ${newY}) is outside the plateau.`,
      );
    }

    if (this.plateau.isPositionOccupied(newX, newY)) {
      throw new Error(
        `Invalid movement: (${newX}, ${newY}) is already occupied.`,
      );
    }

    this.plateau.freePosition(this.x, this.y);
    this.x = newX;
    this.y = newY;
    this.plateau.occupyPosition(this.x, this.y);
  }

  turnLeft(): void {
    const directions = ['N', 'W', 'S', 'E']; // NWSE
    const currentIndex = directions.indexOf(this.direction);
    this.direction = directions[(currentIndex + 1) % 4];
  }

  turnRight(): void {
    const directions = ['N', 'E', 'S', 'W']; // NESW
    const currentIndex = directions.indexOf(this.direction);
    this.direction = directions[(currentIndex + 1) % 4];
  }

  getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  getPositionAsString(): string {
    return `${this.x} ${this.y} ${this.direction}`;
  }
}
