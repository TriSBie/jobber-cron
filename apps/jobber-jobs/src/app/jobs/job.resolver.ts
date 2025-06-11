import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Job } from "./models/job.model";
import { JobsService } from "./job.service";
import { ExecuteJobInput } from "./dto/execute-job.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@jobber/nestjs";

@Resolver()
export class JobResolver {
    constructor(private readonly jobsService: JobsService) { }

    @Query(() => [Job])
    @UseGuards(GqlAuthGuard)
    jobs() {
        return this.jobsService.getJobs();
    }

    @Mutation(() => Job)
    async executeJob(@Args('input') input: ExecuteJobInput) {
        return this.jobsService.executeJob(input.name);
    }
}
