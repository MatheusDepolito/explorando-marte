import { Plateau } from '../../src/models/Plateau';
import { Rover } from '../../src/models/Rover';

describe('Plateau', () => {
  let plateau: Plateau;

  beforeEach(() => {
    plateau = new Plateau(5, 5);
  });

  it('should create a plateau with the correct dimensions', () => {
    expect(plateau).toBeDefined();
    expect(plateau.isPositionValid(0, 0)).toBe(true);
    expect(plateau.isPositionValid(5, 5)).toBe(true);
    expect(plateau.isPositionValid(6, 6)).toBe(false);
  });

  it('should occupy and free positions correctly', () => {
    plateau.occupyPosition(1, 2);
    expect(plateau.isPositionOccupied(1, 2)).toBe(true);

    plateau.freePosition(1, 2);
    expect(plateau.isPositionOccupied(1, 2)).toBe(false);
  });

  it('should add a rover to the plateau', () => {
    const rover = new Rover(1, 2, 'N', plateau);
    plateau.addRover(rover);

    expect(plateau.isPositionOccupied(1, 2)).toBe(true);
  });

  it('should throw an error when adding a rover to an occupied position', () => {
    const rover1 = new Rover(1, 2, 'N', plateau);
    plateau.addRover(rover1);

    const rover2 = new Rover(1, 2, 'E', plateau);
    expect(() => plateau.addRover(rover2)).toThrow(
      'Position (1, 2) is already occupied',
    );
  });

  it('should validate positions correctly', () => {
    expect(plateau.isPositionValid(0, 0)).toBe(true);
    expect(plateau.isPositionValid(5, 5)).toBe(true);

    expect(plateau.isPositionValid(-1, 0)).toBe(false);
    expect(plateau.isPositionValid(0, -1)).toBe(false);

    expect(plateau.isPositionValid(6, 5)).toBe(false);
    expect(plateau.isPositionValid(5, 6)).toBe(false);
  });
});
