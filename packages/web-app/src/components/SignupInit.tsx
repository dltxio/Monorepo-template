import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import owasp from "owasp-password-strength-test";
import React from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";

import InputLabelWrapper from "../components/InputLabelWrapper";
import QuickForm from "../components/QuickForm";
import QuickFormInput from "../components/QuickFormInput";

type Props = {
  initalSignup(data: InitSignupInfo): Promise<void>;
  error: string | string[] | undefined;
  hidePassword: boolean;
  toggleDisplayPassword: () => void;
};

const SignupInit: React.FC<Props> = props => {
  const { initalSignup, error, hidePassword, toggleDisplayPassword } = props;

  const checkPostCode = (postCode: number | undefined) => {
    return postCode?.toString().length === 4;
  };

  const checkPassword = (password: string | undefined) => {
    if (password === undefined) {
      return true;
    }
    const pwValidation = owasp.test(password);
    if (!pwValidation.strong) {
      const errors = pwValidation.errors.toString();
      return false;
    }
    return true;
  };

  const initalSignupSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .test(
        "Password entropy",
        "Please enter a minimum of 10 characters with at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character. It may not contain sequences of three or more repeated characters",
        value => checkPassword(value)
      )
      .required()
  });

  return (
    <>
      <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
        Create account
      </h1>

      <QuickForm<InitSignupInfo>
        initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
        validationSchema={initalSignupSchema}
        onSubmit={initalSignup}
        error={error}
        buttonTitle="Next"
      >
        <div className="my-6 space-y-6">
          <InputLabelWrapper label="" htmlFor="firstName">
            <span>First name</span>
            <QuickFormInput
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First name"
              className="text-md focus:ring-black focus:border-black lg:text-xl"
            />
          </InputLabelWrapper>

          <InputLabelWrapper label="" htmlFor="lastName">
            <span>Last name</span>
            <QuickFormInput
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last name"
              className="text-md focus:ring-black focus:border-black lg:text-xl"
            />
          </InputLabelWrapper>

          <InputLabelWrapper label="" htmlFor="email">
            <span>Email</span>
            <QuickFormInput
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="text-md focus:ring-black focus:border-black lg:text-xl"
            />
          </InputLabelWrapper>

          <div className="grid grid-cols-12 gap-1">
            <div className="col-span-11 ...">
              <span>Password</span>
              <InputLabelWrapper label="" htmlFor="password">
                <QuickFormInput
                  id="password"
                  name="password"
                  type={!hidePassword ? "password" : "text"}
                  placeholder="Password"
                  className="text-md focus:ring-black focus:border-black lg:text-xl"
                />
              </InputLabelWrapper>
            </div>
            <div className="m-3">
              <FontAwesomeIcon
                icon={!hidePassword ? faEyeSlash : faEye}
                className="eye mt-7"
                onClick={toggleDisplayPassword}
              />
            </div>
          </div>
        </div>
      </QuickForm>

      <hr className="my-8" />
      <p className="mt-4">
        <Link
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          to="/login"
        >
          Already have an account? Login
        </Link>
      </p>
    </>
  );
};

export default SignupInit;
