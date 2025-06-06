import { Job } from "../../decorators/job.decorators";
import { AbstractJob } from "./abstract.job";

@Job({
    name: 'Fibonacci',
    description: 'Fibonacci job',
})
export class FibonacciJob extends AbstractJob {
    async execute() {
        console.log('Fibonacci job');
    }
}