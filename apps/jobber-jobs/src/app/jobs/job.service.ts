import { DiscoveredClassWithMeta, DiscoveryService } from "@golevelup/nestjs-discovery";
import { BadRequestException, Injectable, OnModuleInit } from "@nestjs/common";
import { JOB_METADATA_KEY } from "../decorators/job.decorators";
import { JobMetadata } from "../interfaces/job-metadata.interface";
import { AbstractJob } from "./job/abstract.job";

@Injectable()
export class JobsService implements OnModuleInit {
    private jobs: DiscoveredClassWithMeta<JobMetadata>[] = [];

    constructor(private readonly discoveryService: DiscoveryService) { }

    async onModuleInit() {
        this.jobs = await this.discoveryService.providersWithMetaAtKey(JOB_METADATA_KEY);
        console.log(this.jobs);
    }

    getJobs() {
        return this.jobs.map(job => job.meta);
    }

    async executeJob(name: string) {
        const job = this.jobs.find(job => job.meta.name === name);

        if (!job) {
            throw new BadRequestException(`Job ${name} not found`);
        }

        await (job.discoveredClass.instance as AbstractJob).execute();

        return job.meta;
    }
}
