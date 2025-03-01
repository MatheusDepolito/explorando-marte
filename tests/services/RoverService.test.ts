import { RoverService } from '../../src/services/RoverService';

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
