// Used in ThemeContext
type Mode = string | null;

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.jpg" {
  const content: any;
  export default content;
}

declare module "@tailwindcss/forms";

declare type ListenerMap = Record<string, any>;

declare module "owasp-password-strength-test";

declare type InitSignupInfo = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

declare type Address = {
  address1: string;
  address2: string;
  state: string;
  postCode: string;
};
