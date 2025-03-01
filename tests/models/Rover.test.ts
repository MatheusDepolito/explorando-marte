import { Plateau } from '../../src/models/Plateau';
import { Rover } from '../../src/models/Rover';

describe('Rover', () => {
  let plateau: Plateau;
  let rover: Rover;

  beforeEach(() => {
    plateau = new Plateau(5, 5);
    rover = new Rover(1, 2, 'N', plateau);
  });

  it('should move forward', () => {
    rover.move();
    expect(rover.getPositionAsString()).toBe('1 3 N');
  });

  it('should turn left', () => {
    rover.turnLeft();
    expect(rover.getPositionAsString()).toBe('1 2 W');
  });

  it('should turn right', () => {
    rover.turnRight();
    expect(rover.getPositionAsString()).toBe('1 2 E');
  });
});
