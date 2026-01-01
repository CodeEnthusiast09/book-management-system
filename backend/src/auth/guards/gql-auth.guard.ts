import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphqlContext } from 'src/graphql/graphql-context.interface';
import { AuthenticatedRequest } from '../interface/authenticated-request.interface';

@Injectable()
export class GqlAuthGuard extends AuthGuard('auth0') {
  getRequest(context: ExecutionContext): AuthenticatedRequest {
    const gqlCtx = GqlExecutionContext.create(context);

    const ctx = gqlCtx.getContext<GraphqlContext>();

    return ctx.req;
  }
}
