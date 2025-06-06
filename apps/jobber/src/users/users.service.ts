import { Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma/prisma.service';
import { Prisma } from '@prisma-client/jobber';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({
            data: {
                ...data,
                password: await hash(data.password, 10),
            },
        });
    }

    async getUsers() {
        return this.prisma.user.findMany();
    }

    async getUser(args: Prisma.UserWhereUniqueInput) {
        return this.prisma.user.findUnique({
            where: args,
        });
    }

}
