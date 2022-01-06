declare namespace AuthService {
  type Config = {
    secret: string;
    validForInHours: number;
  };

  interface IAuthService {
    signJWT(payload: Omit<api.DecodedAuthToken, "exp">): string;
    decodeJWT(token: string): Promise<api.DecodedAuthToken | undefined>;
  }
}
