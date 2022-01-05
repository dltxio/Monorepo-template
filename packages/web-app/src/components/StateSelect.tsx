import { useField } from "formik";
import React from "react";

import Select from "./Select";

type Props = React.SelectHTMLAttributes<HTMLSelectElement>;

const children = [
  <option value="" label="State" disabled key="default" />,
  <option value="QLD" label="QLD" key="QLD" />,
  <option value="NSW" label="NSW" key="NSW" />,
  <option value="ACT" label="ACT" key="ACT" />,
  <option value="VIC" label="VIC" key="VIC" />,
  <option value="TAS" label="TAS" key="TAS" />,
  <option value="SA" label="SA" key="SA" />,
  <option value="WA" label="WA" key="WA" />,
  <option value="NT" label="NT" key="NT" />
];

const StateSelect: React.FC<Props> = props => {
  const [field, meta] = useField(props as any);

  const error = meta.error && meta.touched ? meta.error : undefined;
  const valid = error === undefined;

  return (
    <Select {...props} {...field} error={error} valid={valid}>
      {children}
    </Select>
  );
};

export default StateSelect;
