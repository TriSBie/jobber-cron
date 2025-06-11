import { DiscoveryModule } from "@golevelup/nestjs-discovery";
import { Module } from "@nestjs/common";
import { JobResolver } from "./job.resolver";
import { JobsService } from "./job.service";
import { FibonacciJob } from "./job/fibonacci.job";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AUTH_PACKAGE_NAME } from "types/auth";
import { join } from "path";

@Module({
    imports: [DiscoveryModule, ClientsModule.register([
        {
            name: AUTH_PACKAGE_NAME,
            transport: Transport.GRPC,
            options: {
                package: AUTH_PACKAGE_NAME,
                protoPath: join(__dirname, 'proto/auth.proto'),
            }
        }
    ])],
    providers: [JobsService, JobResolver, FibonacciJob]
})
export class JobModule { }
