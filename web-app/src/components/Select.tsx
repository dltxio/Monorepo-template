import classNames from "classnames";
import React, { useContext } from "react";

import { ThemeContext } from "./context/ThemeContext";

export interface SelectProps extends React.ComponentPropsWithRef<"select"> {
  /**
   * Defines the color of the select
   */
  valid?: boolean;
  error?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  props,
  ref
) {
  const {
    valid,
    children,
    className,
    multiple,
    disabled,
    error,
    ...other
  } = props;

  const {
    theme: { select }
  } = useContext(ThemeContext);

  const baseStyle = select.base;
  const activeStyle = select.active;
  const validStyle = select.valid;
  const invalidStyle = select.invalid;
  const disabledStyle = select.disabled;
  const selectStyle = select.select;

  function hasValidation(valid: boolean | undefined) {
    return valid !== undefined;
  }

  function validationStyle(valid: boolean | undefined): string {
    if (hasValidation(valid)) {
      return valid ? validStyle : invalidStyle;
    }
    return "";
  }

  const cls = classNames(
    baseStyle,
    // don't apply activeStyle if has valid or disabled
    !hasValidation(valid) && !disabled && activeStyle,
    // don't apply disabledStyle if has valid
    !hasValidation(valid) && disabled && disabledStyle,
    validationStyle(valid),
    !multiple && selectStyle,
    className
  );

  return (
    <div>
      <select
        className={cls}
        ref={ref}
        disabled={disabled}
        multiple={!!multiple}
        {...other}
      >
        {children}
      </select>
      {error && (
        <p className="m-3 text-sm text-gray-600 ">
          {error.charAt(0).toUpperCase() + error.slice(1)}
        </p>
      )}
    </div>
  );
});

export default Select;
