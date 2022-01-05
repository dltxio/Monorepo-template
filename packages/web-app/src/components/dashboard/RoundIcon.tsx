import classNames from "classnames";
import React from "react";

function RoundIcon({
  icon: Icon,
  iconColorClass = "text-blue-600 dark:text-blue-100",
  bgColorClass = "bg-blue-100 dark:bg-blue-600",
  className
}: any) {
  const baseStyle = "p-3 rounded-full";

  const cls = classNames(baseStyle, iconColorClass, bgColorClass, className);
  return (
    <div className={cls}>
      <Icon className="w-5 h-5" />
    </div>
  );
}

export default RoundIcon;
