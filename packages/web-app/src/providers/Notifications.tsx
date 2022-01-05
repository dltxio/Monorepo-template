import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { createContext } from "react";
import { toast, ToastContainer } from "react-toastify";

export type PromiseNotificationMessages = {
  pending: string;
  success: string;
  error: string;
};

type ShowPromiseNotification = (
  messages: PromiseNotificationMessages,
  transaction: Promise<any>
) => void;

export type Notifications = {
  showPromiseNotification: ShowPromiseNotification;
};

export const NotificationsContext = createContext<Notifications>(null as any);

export const NotificationsProvider: React.FC<{
  children: React.ReactNode;
}> = function (props) {
  const showPromiseNotification: ShowPromiseNotification = (
    messages,
    promise: Promise<any>
  ) => {
    toast.promise(promise, messages, {
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_RIGHT
    });
  };

  return (
    <NotificationsContext.Provider value={{ showPromiseNotification }}>
      {props.children}
      <ToastContainer />
    </NotificationsContext.Provider>
  );
};
