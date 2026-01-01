import { RequestWithUser } from './request-with-user.interface';
import { JwtPayload } from './jwt-payload.interface';

export interface AuthenticatedRequest extends RequestWithUser {
  user: JwtPayload;
}
