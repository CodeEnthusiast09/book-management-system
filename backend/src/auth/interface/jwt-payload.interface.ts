export interface JwtPayload {
  sub: string;
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}
