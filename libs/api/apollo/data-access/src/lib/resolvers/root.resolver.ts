import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class RootResolver {
  @Query(() => String)
  public helloWorld(): string {
    return 'Hello World';
  }
}
