import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Job {
    @Field()
    name: String;

    @Field()
    description: String
}