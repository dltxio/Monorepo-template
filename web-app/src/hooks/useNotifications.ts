import React from "react";

import {
  Notifications,
  NotificationsContext
} from "../providers/Notifications";

const useNotifications = (): Notifications =>
  React.useContext(NotificationsContext);

export default useNotifications;
