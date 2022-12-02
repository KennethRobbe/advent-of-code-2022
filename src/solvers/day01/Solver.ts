import BaseSolver from '../base/Solver.js';

type IChunk = number[];
type IInput = IChunk[];

export default class Solver extends BaseSolver {
    DAY = '01';
    CHUNK_REGEX = /\r?\n\r?\n/g;
    PART_REGEX = /\r?\n/g;

    processParts(rawParts: string[]): IChunk {
        return rawParts.map((p) => parseInt(p, 10));
    }

    solveFirstChallenge(input: IInput) {
        return this.genericSolve(input, 1);
    }

    solveSecondChallenge(input: IInput) {
        return this.genericSolve(input, 3);
    }

    genericSolve(input: IInput, numberOfElves: number) {
        const sums = input.map((c) => c.reduce((t, v) => t + v, 0));
        const sortedSums = sums.sort((a, b) => b - a);
        const topSums = sortedSums.slice(0, numberOfElves);
        const maxSum = topSums.reduce((t, v) => t + v, 0);

        return maxSum;
    }
}
