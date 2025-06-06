import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuards } from '../app/auth/guards/gqp-auth.guards';
import { TokenPayload } from '../app/auth/types';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { CurrentUser } from '../app/auth/current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(GqlAuthGuards)
    @Query(() => [User], { name: 'users' })
    async getUsers(@CurrentUser() abc: any) {
        return this.usersService.getUsers();
    }

    @UseGuards(GqlAuthGuards)
    @Mutation(() => User)
    async createUser(@Args('createUser') user: CreateUserInput) {
        return this.usersService.create(user);
    }

    @UseGuards(GqlAuthGuards)
    @Query(() => User, { name: 'currentUser' })
    async getCurrentUser(@CurrentUser() userInfo: TokenPayload) {
        return this.usersService.getUser({ id: Number(userInfo.userId) });
    }
}
