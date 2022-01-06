import { useField } from "formik";
import React from "react";

import Input from "./Input";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const QuickFormInput: React.FC<Props> = props => {
  const [field, meta] = useField(props as any);

  let error = meta.error && meta.touched ? meta.error : undefined;
  const valid = error === undefined;

  // Bit of a hack to fix how formik displays feild errors
  if (!valid && error?.includes("firstName")) {
    error = "First name is a required field";
  } else if (!valid && error?.includes("lastName")) {
    error = "Last name is a required field";
  }

  return <Input {...props} {...field} error={error} valid={valid} />;
};

export default QuickFormInput;
