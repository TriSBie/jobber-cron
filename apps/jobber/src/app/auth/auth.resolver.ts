import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';
import { LoginInput } from './dto/login.input';
import { AuthService } from './auth.service';
import { GqlContext } from '@jobber/nestjs';

@Resolver()
export class AuthResolver {

    constructor(private readonly authService: AuthService) { }

    @Mutation(() => User)
    async login(@Args('loginInput') loginInput: LoginInput, @Context() context: GqlContext) {
        return this.authService.login(loginInput, context.res);
    }
}
