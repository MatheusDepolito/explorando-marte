import { Rover } from "../models/Rover";

export interface Command {
  execute(): void; // void??
}

export class MoveCommand implements Command {
  constructor(private rover: Rover) {}

  execute(): void {
    this.rover.move();
  }
}

export class LeftCommand implements Command {
  constructor(private rover: Rover) {}

  execute(): void {
    this.rover.turnLeft();
  }
}

export class RightCommand implements Command {
  constructor(private rover: Rover) {}

  execute(): void {
    this.rover.turnRight();
  }
}