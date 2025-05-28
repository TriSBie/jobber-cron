import { Field, ObjectType } from "@nestjs/graphql";
import { AbstractModel } from "@jobber/nestjs";

@ObjectType()
export class User extends AbstractModel {
    @Field(() => String)
    email!: string;
}