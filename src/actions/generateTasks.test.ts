import {Sets, Difficulties} from '../reducers';
import {generateTasks, setTasks} from '.';
import {expectedOutput} from './expectedOutput';

test.each`
  set            | difficulty                   | expected
  ${Sets.red}    | ${Difficulties.beginner}     | ${expectedOutput.red.beginner}
  ${Sets.red}    | ${Difficulties.intermediate} | ${expectedOutput.red.intermediate}
  ${Sets.red}    | ${Difficulties.advanced}     | ${expectedOutput.red.advanced}
  ${Sets.orange} | ${Difficulties.beginner}     | ${expectedOutput.orange.beginner}
  ${Sets.orange} | ${Difficulties.intermediate} | ${expectedOutput.orange.intermediate}
  ${Sets.orange} | ${Difficulties.advanced}     | ${expectedOutput.orange.advanced}
  ${Sets.yellow} | ${Difficulties.beginner}     | ${expectedOutput.yellow.beginner}
  ${Sets.yellow} | ${Difficulties.intermediate} | ${expectedOutput.yellow.intermediate}
  ${Sets.yellow} | ${Difficulties.advanced}     | ${expectedOutput.yellow.advanced}
  ${Sets.green}  | ${Difficulties.beginner}     | ${expectedOutput.green.beginner}
  ${Sets.green}  | ${Difficulties.intermediate} | ${expectedOutput.green.intermediate}
  ${Sets.green}  | ${Difficulties.advanced}     | ${expectedOutput.green.advanced}
  ${Sets.blue}   | ${Difficulties.beginner}     | ${expectedOutput.blue.beginner}
  ${Sets.blue}   | ${Difficulties.intermediate} | ${expectedOutput.blue.intermediate}
  ${Sets.blue}   | ${Difficulties.advanced}     | ${expectedOutput.blue.advanced}
  ${Sets.indigo} | ${Difficulties.beginner}     | ${expectedOutput.indigo.beginner}
  ${Sets.indigo} | ${Difficulties.intermediate} | ${expectedOutput.indigo.intermediate}
  ${Sets.indigo} | ${Difficulties.advanced}     | ${expectedOutput.indigo.advanced}
`(
  'returns expected tasks with $set $difficulty',
  async ({set, difficulty, expected}) => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    const dispatch = jest.fn();
    const getState = jest.fn();

    getState.mockReturnValueOnce({
      game: {
        selectedSet: set,
        selectedDifficulty: difficulty,
      },
    });

    await generateTasks()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setTasks(expected));
    (global.Math.random as any).mockRestore();
  },
);
