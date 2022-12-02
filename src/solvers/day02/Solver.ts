import BaseSolver from '../base/Solver.js';

type Play = 'rock' | 'paper' | 'scissors';
type Result = 'win' | 'draw' | 'lose';

type PlayMapping = {
    [key: string]: Play;
};

type ResultMapping = {
    [key: string]: Result;
};

type BaseScoreMapping = {
    [Property in Play]: number;
};

type ResultScoreMapping = {
    [Property in Result]: number;
};

type PlayResultMapping = {
    [Property in Play]: Play;
};
const winMapping: PlayResultMapping = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
};
const loseMapping: PlayResultMapping = {
    rock: 'paper',
    paper: 'scissors',
    scissors: 'rock',
};

type Chunk = {
    opponent: string;
    player: string;
};
type MappedChunk = {
    opponent: Play;
    player: Play;
};

type Input = Chunk[];
type MappedInput = MappedChunk[];

export default class Solver extends BaseSolver {
    DAY = '02';

    processParts(rawParts: string[]): Chunk {
        const [opponent, player] = rawParts;

        return {
            opponent,
            player,
        };
    }

    solveFirstChallenge(input: Input): number {
        const mapping: PlayMapping = {
            A: 'rock',
            B: 'paper',
            C: 'scissors',
            X: 'rock',
            Y: 'paper',
            Z: 'scissors',
        };

        const mappedInput = input.map(({ player, opponent }) => ({
            player: mapping[player],
            opponent: mapping[opponent],
        }));

        return this.calculateTotalScore(mappedInput);
    }

    solveSecondChallenge(input: Input): number {
        const playMapping: PlayMapping = {
            A: 'rock',
            B: 'paper',
            C: 'scissors',
        };

        const resultMapping: ResultMapping = {
            X: 'lose',
            Y: 'draw',
            Z: 'win',
        };

        const mappedInput = input.map(({ player, opponent }) => {
            const opponentPlay = playMapping[opponent];
            const requiredResult = resultMapping[player];

            let playerPlay: Play;
            if (requiredResult === 'draw') {
                playerPlay = opponentPlay;
            } else if (requiredResult === 'win') {
                playerPlay = loseMapping[opponentPlay];
            } else {
                playerPlay = winMapping[opponentPlay];
            }

            return {
                opponent: opponentPlay,
                player: playerPlay,
            };
        });

        return this.calculateTotalScore(mappedInput);
    }

    calculateTotalScore(input: MappedInput) {
        const scores = input.map(({ player, opponent }) =>
            this.calculateScore(
                player,
                opponent,
                { rock: 1, paper: 2, scissors: 3 },
                { lose: 0, draw: 3, win: 6 }
            )
        );

        return scores.reduce((t, v) => t + v, 0);
    }

    calculateScore(
        player: Play,
        opponent: Play,
        baseScoreMapping: BaseScoreMapping,
        resultScoreMapping: ResultScoreMapping
    ) {
        const baseScore = baseScoreMapping[player];

        let result: Result;
        if (player === opponent) {
            result = 'draw';
        } else if (winMapping[player] === opponent) {
            result = 'win';
        } else {
            result = 'lose';
        }

        const resultScore = resultScoreMapping[result];

        return baseScore + resultScore;
    }
}
