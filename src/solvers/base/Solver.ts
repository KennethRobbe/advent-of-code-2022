import { readFile } from 'node:fs/promises';
import chalk from 'chalk';

export default class Solver {
    DAY = '00';
    CHUNK_REGEX = /\r?\n/g;
    PART_REGEX = /\s/g;

    async solve() {
        console.info(chalk.bold.yellow(`Solving Day ${this.DAY}...`));

        await this.doFirstChallenge();
        await this.doSecondChallenge();
    }

    async getInput() {
        const rawInput = await readFile(
            `./src/solvers/day${this.DAY}/input.txt`,
            'utf-8'
        );
        const parsedInput = this.parseInput(rawInput);

        return parsedInput;
    }

    parseInput(rawInput: string) {
        const chunks = rawInput.split(this.CHUNK_REGEX);
        const parsedChunks = chunks.map((c) => this.parseChunk(c));

        return parsedChunks;
    }

    parseChunk(rawChunk: string) {
        const parts = rawChunk.split(this.PART_REGEX);
        const output = this.processParts(parts);

        return output;
    }

    processParts(rawParts: string[]): any {
        return rawParts;
    }

    async doFirstChallenge() {
        console.info(chalk.underline(`Solving first challenge...`));
        const input = await this.getInput();
        const answer = this.solveFirstChallenge(input);

        if (answer) {
            console.info(
                `Answer for first challenge is: ${chalk.green.bold(answer)}`
            );
        }
    }

    solveFirstChallenge(input) {
        console.error('Missing implementation to solve first challenge');

        return undefined;
    }

    async doSecondChallenge() {
        console.info(chalk.underline(`Solving second challenge...`));
        const input = await this.getInput();
        const answer = this.solveSecondChallenge(input);

        if (answer) {
            console.info(
                `Answer for second challenge is: ${chalk.green.bold(answer)}`
            );
        }
    }

    solveSecondChallenge(input) {
        console.error('Missing implementation to solve second challenge');

        return undefined;
    }
}
