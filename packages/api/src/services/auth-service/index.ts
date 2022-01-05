import * as jwt from "jsonwebtoken";

export default class AuthService implements AuthService.IAuthService {
  constructor(private readonly config: AuthService.Config) {}

  public signJWT = (payload: api.DecodedAuthToken): string =>
    jwt.sign(payload, this.config.secret, {
      expiresIn: this.config.validForInHours * 60 * 60
    });

  public decodeJWT = async (
    token: string
  ): Promise<api.DecodedAuthToken | undefined> => {
    if (!token) {
      return undefined;
    }

    try {
      return jwt.verify(token, this.config.secret) as api.DecodedAuthToken;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };
}
