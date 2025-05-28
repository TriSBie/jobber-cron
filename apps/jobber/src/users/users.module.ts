import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaModule } from '../app/prisma/prisma.module';
@Module({
    providers: [UsersService, UsersResolver],
    exports: [UsersService],
    imports: [PrismaModule],
})
export class UsersModule { }
