import * as solvers from './solvers/index.js';
import { createCLI } from 'soly';
import { z } from 'zod';

const cli = createCLI('cli');

cli.command('solve', (cmd) => {
    const [day] = cmd.positionals([z.string()]);

    return async () => {
        const Solver = solvers[day.value];
        const solver = new Solver();
        await solver.solve();
    };
});

cli.parse();
