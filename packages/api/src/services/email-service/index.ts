import mailJet from "node-mailjet";

export default class EmailService implements IEmailService {
  private mailJet;
  constructor(private config: Config, private logger: core.backend.Logger) {
    this.mailJet = mailJet.connect(
      this.config.mailJet.apiKey,
      this.config.mailJet.apiSecret
    );
  }

  public sendEmailVerification = async (user: data.User) => {
    const subject = `PowerPlay email verification`;
    const link = `${this.config.appURL}/verify-email?email=${user.email}&token=${user.emailVerificationCode}`;
    return this.sendRawEmail({
      to: user.email,
      toName: user.email,
      subject,
      html: `<p>Please <a href="${link}">click here</a> to verify your email with PowerPlay.<p>`
    });
  };

  private sendEmail = async (emailParams: Record<string, any>) => {
    try {
      await this.mailJet.post("send", { version: "v3.1" }).request({
        Messages: [emailParams]
      });
    } catch (e) {
      this.logger.error("Failed to send email", e);
      throw e;
    }
  };

  private getMailJetBasePayload = (params: SimpleEmailParams) => {
    return {
      From: {
        Email: this.config.mailJet.fromEmailAddress,
        Name: "PowerPlay"
      },
      To: [
        {
          Email: params.to,
          Name: params.toName
        }
      ],
      TemplateLanguage: true,
      Subject: params.subject
    };
  };

  private sendRawEmail = async (params: RawEmailParams) =>
    this.sendEmail({
      ...this.getMailJetBasePayload(params),
      HtmlPart: params.html
    });
}

type SimpleEmailParams = {
  to: string;
  toName: string;
  subject: string;
};

type RawEmailParams = SimpleEmailParams & {
  html: string;
};
