import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import * as yup from "yup";

import { Button, Input, Label } from "../components";
import InputLabelWrapper from "../components/InputLabelWrapper";
import QuickForm from "../components/QuickForm";
import QuickFormInput from "../components/QuickFormInput";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import { GithubIcon, TwitterIcon } from "../icons";
import { EyeIcon, EyeOffIcon } from "../icons";

type Props = {};

const Login: React.FC<Props> = () => {
  const { login: authLogin } = useAuth();
  const api = useApi();
  const history = useHistory();
  const [error, setError] = React.useState<string>();
  const [hidePassword, setHidePassword] = useState<boolean>(false);

  const login = async (data: api.LoginRequestBody) => {
    try {
      const token = await api.login(data);
      await authLogin(token);
      history.push("/app");
    } catch (err) {
      if (err.statusCode) {
        const error: api.ErrorResponse = err;
        if (error.statusCode === 404) {
          const notFoundError = error as api.NotFoundResponse;
          if (notFoundError.resource === "user") {
            return setError("Account not found. Please try again.");
          }
          if (notFoundError.resource === "emailVerified") {
            history.push("/verify-email");
          }
        }
      }
      setError(err.message);
    }
  };

  const toggleDisplayPassword = () => {
    setHidePassword(!hidePassword);
  };

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
  });

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto ">
          <main className="flex items-center justify-center p-6 sm:p-12 ">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>

              <QuickForm<api.LoginRequestBody>
                initialValues={{ email: "", password: "" }}
                validationSchema={schema}
                onSubmit={login}
                error={error}
                buttonTitle="Login"
              >
                <div className="my-6 space-y-6">
                  <InputLabelWrapper label="" htmlFor="email">
                    <span>Email</span>
                    <QuickFormInput
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="focus:ring-black focus:border-black "
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
                          className="focus:ring-black focus:border-black"
                        />
                      </InputLabelWrapper>
                    </div>
                    <div
                      className="m-3 mt-9 text-gray-600 cursor-pointer"
                      onClick={toggleDisplayPassword}
                    >
                      {!hidePassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <span className="mt-6">
                    <Label check>
                      <Input type="checkbox" />
                      <span className="ml-2">Remember me</span>
                    </Label>
                  </span>
                  <span className="mt-6 text-right">
                    <Link
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      to="/forgot-password"
                    >
                      Forgot your password?
                    </Link>
                  </span>
                </div>
              </QuickForm>

              <hr className="my-8" />
              {/*
                            // Add these back later?
                            <div className="grid grid-cols-2 gap-4">
                                <Button block layout="outline">
                                    <GithubIcon
                                        className="w-4 h-4 mr-2"
                                        aria-hidden="true"
                                    />
                                    Github
                                </Button>
                                <Button block layout="outline">
                                    <TwitterIcon
                                        className="w-4 h-4 mr-2"
                                        aria-hidden="true"
                                    />
                                    Twitter
                                </Button>
                            </div>
                            */}
              <span className="mt-6">
                <Link
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </span>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Login;
