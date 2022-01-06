import React from "react";
import * as yup from "yup";

import InputLabelWrapper from "../components/InputLabelWrapper";
import QuickForm from "../components/QuickForm";
import QuickFormInput from "../components/QuickFormInput";
import StateSelect from "../components/StateSelect";

type Props = {
  signup(data: Address): Promise<void>;
  error: string | string[] | undefined;
};

const SignupAddress: React.FC<Props> = props => {
  const { signup, error } = props;

  const checkPostCode = (postCode: string | undefined) => {
    if (postCode === undefined) {
      return false;
    }
    return postCode?.length === 4 && !isNaN(parseInt(postCode));
  };

  const addressSchema = yup.object().shape({
    address1: yup.string().required(),
    address2: yup.string(),
    state: yup.string().required(),
    postCode: yup
      .string()
      .test("Post code", "Please enter a valid postcode.", value =>
        checkPostCode(value)
      )
      .required()
  });

  return (
    <>
      <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
        Add your address
      </h1>

      <QuickForm<Address>
        initialValues={{ address1: "", address2: "", state: "", postCode: "" }}
        validationSchema={addressSchema}
        onSubmit={signup}
        error={error}
        buttonTitle="Sign up"
        validateOnMount={true}
      >
        <div className="my-6 space-y-6">
          <InputLabelWrapper label="" htmlFor="address1">
            <span>Address line 1</span>
            <QuickFormInput
              id="address1"
              name="address1"
              type="address1"
              placeholder="Address line 1"
              className="text-md focus:ring-black focus:border-black lg:text-xl"
            />
          </InputLabelWrapper>

          <InputLabelWrapper label="" htmlFor="address1">
            <span>Address line 2</span>
            <QuickFormInput
              id="address2"
              name="address2"
              type="address2"
              placeholder="Address line 2"
              className="text-md focus:ring-black focus:border-black lg:text-xl"
            />
          </InputLabelWrapper>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6 ...">
              <span>Postcode</span>
              <InputLabelWrapper label="" htmlFor="postCode">
                <QuickFormInput
                  id="postCode"
                  name="postCode"
                  placeholder="Postcode"
                  className="text-md focus:ring-black focus:border-black lg:text-xl"
                />
              </InputLabelWrapper>
            </div>

            <div className="col-span-6 ...">
              <InputLabelWrapper label="" htmlFor="state">
                <span>State</span>
                <StateSelect
                  id="state"
                  name="state"
                  placeholder="State"
                  className="text-md focus:ring-black focus:border-black lg:text-xl"
                />
              </InputLabelWrapper>
            </div>
          </div>
        </div>
      </QuickForm>
    </>
  );
};

export default SignupAddress;
