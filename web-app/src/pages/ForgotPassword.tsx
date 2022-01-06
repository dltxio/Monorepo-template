import React from "react";
import { Link } from "react-router-dom";

import { Button, Input, Label } from "../components";

type Props = {};

const ForgotPassword: React.FC<Props> = props => {
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto">
          <main className="flex items-center justify-center p-6 sm:p-12">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Forgot password
              </h1>

              <Label>
                <span>Email</span>
                <Input className="mt-1" placeholder="Jane Doe" />
              </Label>
              <Link to="/login">
                <Button tag={Link as any} block className="mt-4">
                  Recover password
                </Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
