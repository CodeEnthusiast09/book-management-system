import { RequestWithUser } from 'src/auth/interface/request-with-user.interface';

export interface GraphqlContext {
  req: RequestWithUser;
}
