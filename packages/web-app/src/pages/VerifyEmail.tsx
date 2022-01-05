import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { Link, Redirect } from "react-router-dom";

import { Button } from "../components";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import useQuery from "../hooks/useQuery";

const VerifyEmail: React.FC = () => {
  const [error, setError] = useState<string>();
  const api = useApi();
  const { user, setUser } = useAuth();
  const [counter, setCounter] = useState<number>(300);
  const history = useHistory();
  const queryString = useQuery();
  const [emailResent, setEmailResent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  useEffect(() => {
    const email = queryString.get("email");
    const token = queryString.get("token");

    if (!!email && !!token && emailVerified === false) {
      try {
        api
          .verifyEmail({ email, token })
          .then(updatedUser => {
            setEmailVerified(true);
            setUser(updatedUser);
          })
          .catch(err => {
            setError(err.message);
          });
      } catch (err) {
        if (err.statusCode) {
          const error: api.ErrorResponse = err;
          if (error.statusCode === 404) {
            const notFoundError = error as api.NotFoundResponse;
            if (notFoundError.resource === "user") {
              return setError("Account not found. Please try again.");
            }
          }
        }
        setError(err.message);
      }
    }
  }, [api, history, queryString, setUser, emailVerified]);

  useEffect(() => {
    const email = queryString?.get("email");
    const token = queryString?.get("token");

    if (user && user.emailVerified && !email && !token) {
      history.push("/app");
    }
  }, [user, history, queryString]);

  useEffect(() => {
    const token = queryString?.get("token");
    if (user === undefined && !token) {
      history.push("/login");
    }
  }, [user, history, queryString]);

  const sendEmail = async () => {
    setCounter(300);
    try {
      await api.sendEmailVerification();
      setEmailResent(true);
    } catch {
      alert("Error sending email.");
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto ">
          <main className="flex items-center justify-center p-6 sm:p-12 ">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Verify Email
              </h1>

              {emailVerified ? (
                <div className="">
                  <div className="">
                    <p>
                      Your account has been verified.{" "}
                      <Link
                        className="text-blue-600 cursor-pointer mt-4 dark:text-blue-400 hover:underline"
                        to="/login"
                      >
                        Click here to login
                      </Link>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="">
                  <div className="">
                    <p>
                      We sent a verification link to{" "}
                      {user ? (
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          {user?.email}
                        </span>
                      ) : (
                        "your email"
                      )}
                      . Please activate your account using the link provided in
                      the email.
                    </p>
                    <p className="text-left my-3">
                      Have not received the email?
                      {(error || counter === 0) && user ? (
                        <span
                          onClick={sendEmail}
                          className="highlight cursor-pointer"
                        >
                          {" "}
                          <p />
                          <Button className="mt-4">Resend email</Button>
                        </span>
                      ) : (
                        <span className="highlight">
                          {" "}
                          Resend in {counter} seconds
                        </span>
                      )}{" "}
                    </p>
                  </div>
                  {emailResent && (
                    <p className="text-left ml-3">
                      Email resent, please check your inbox.
                    </p>
                  )}
                </div>
              )}
              <p className="mt-6">
                <Link to="/login">
                  <Button>Back</Button>
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
