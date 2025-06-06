import { DiscoveryModule } from "@golevelup/nestjs-discovery";
import { Module } from "@nestjs/common";
import { JobResolver } from "./job.resolver";
import { JobsService } from "./job.service";
import { FibonacciJob } from "./job/fibonacci.job";


@Module({
    imports: [DiscoveryModule,],
    providers: [JobsService, JobResolver, FibonacciJob]
})
export class JobModule { }
