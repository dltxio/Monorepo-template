export const userSerialiser = (user: data.User): api.User => ({
  userId: user.userId,
  email: user.email,
  emailVerified: user.emailVerified,
  firstName: user.firstName,
  lastName: user.lastName,
  phoneNumber: user.phoneNumber,
  phoneNumberVerified: user.phoneNumberVerified,
  admin: user.admin
});
