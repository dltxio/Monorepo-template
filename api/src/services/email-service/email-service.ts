type SendEmailResult = {
  success: boolean;
};

interface IEmailService {
  sendEmailVerification: (user: data.User) => Promise<void>;
}

export {};
