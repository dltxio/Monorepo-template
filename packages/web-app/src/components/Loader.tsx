import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import React from "react";

type Props = {
  className?: string;
};

const Loader: React.FC<Props> = props => {
  return (
    <FontAwesomeIcon
      className={classnames("animate-spin", props.className)}
      icon={faSpinner}
    />
  );
};

export default Loader;
