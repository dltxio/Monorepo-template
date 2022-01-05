import bcrypt from "bcrypt";
import { Request } from "express";

export const hashPassword = async (
  password: string,
  saltRounds: number
): Promise<string> =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (error, hash) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(hash);
    });
  });

export const doesPasswordMatchHash = async (
  password: string,
  hash: string
): Promise<boolean> =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    });
  });

export const userToJWT = (
  user: data.User,
  authService: AuthService.IAuthService
): string =>
  authService.signJWT({
    userId: user.userId,
    email: user.email
  });

export const getAuthHeader = (request: {
  headers: Request["headers"];
}): string | undefined => {
  const authHeader = request.headers.authorization;
  if (authHeader) {
    const split = authHeader && authHeader.split && authHeader.split("Bearer ");
    return split && split[1];
  }

  return undefined;
};
