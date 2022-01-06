import HTTPClient from "./HTTPClient";
export default class Api extends HTTPClient {
  public login = async (body: api.LoginRequestBody) =>
    this.post<string>(`/auth/login`, body);

  public signup = async (body: api.SignupRequestBody) =>
    this.post<string>(`/auth/signup`, body);

  public sendEmailVerification = async () =>
    this.post("/auth/send-verification-email", {});

  public verifyEmail = async (body: api.EmailVerificationBody) =>
    this.post<api.User>("/auth/verify-email", body);

  public fetchAuthUser = async () => this.get<api.User>(`/user`);

  public addAlias = async (body: api.SetAliasRequestBody) =>
    this.post<api.User>(`/user/alias`, body);
}
