declare namespace data {
  type User = {
    userId: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    emailVerified: boolean;
    emailVerificationCode: string;
    createdAt: Date;
    updateAt: Date;
    phoneNumber: string | null;
    phoneNumberVerificationCode: string | null;
    phoneNumberVerified: boolean;
    admin: boolean;
    powerProvider: string | null;
    spendableBalance: number;
    customerUniqueReference: string | undefined;
  };

  type NewUser = Pick<User, "email", "password", "firstName", "lastName">;

  interface IUsersClient extends IClientBase<User, NewUser> {}
}
