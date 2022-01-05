import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";

import SignupAddress from "../components/SignupAddress";
import SignupInit from "../components/SignupInit";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import { getApiError } from "../utils/error";

type Step = "inital" | "address";

type Props = {};

const CreateAccount: React.FC<Props> = props => {
  const { login } = useAuth();
  const api = useApi();
  const history = useHistory();
  const [error, setError] = React.useState<string>();
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const [step, setStep] = useState<Step>("inital");
  const [formInfo, setFormInfo] = useState<InitSignupInfo>({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const initalSignup = async (data: InitSignupInfo) => {
    try {
      setFormInfo({
        email: data.email.toLowerCase(),
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName
      });
      setStep("address");
    } catch (error) {
      // Fix errors here
      const apiError = getApiError(error);

      if (apiError?.reason === "bad_request" && apiError.type === "general") {
        return setError(error.message);
      }

      setError(error.message);
    }
  };

  const signup = async (data: Address) => {
    try {
      const token = await api.signup({
        email: formInfo.email.toLowerCase(),
        password: formInfo.password,
        firstName: formInfo.firstName,
        lastName: formInfo.lastName,
        address1: data?.address1,
        address2: data?.address2,
        state: data?.state,
        postCode: data?.postCode
      });
      await login(token);
      history.push("/verify-email");
    } catch (error) {
      const apiError = getApiError(error);

      if (apiError?.reason === "bad_request" && apiError.type === "general") {
        return setError(error.message);
      }

      setError(error.message);
    }
  };

  const toggleDisplayPassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto">
          <main className="flex items-center justify-center p-6 sm:p-12 ">
            <div className="w-full">
              {step === "inital" && (
                <SignupInit
                  error={error}
                  initalSignup={initalSignup}
                  hidePassword={hidePassword}
                  toggleDisplayPassword={toggleDisplayPassword}
                />
              )}

              {step === "address" && (
                <SignupAddress error={error} signup={signup} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
