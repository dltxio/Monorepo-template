import React, { lazy, Suspense, useContext, useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";

import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";
import ThemedSuspense from "../components/dashboard/ThemedSuspense";
import { SidebarContext } from "../context/SidebarContext";
import routes from "../routes";
import AuthRoute from "../utils/authRoute";
import Main from "./Main";

const Page404 = lazy(() => import("../pages/404"));

function Layout() {
  const { isSidebarOpen, closeSidebar }: any = useContext(SidebarContext);
  const location = useLocation();

  useEffect(() => {
    closeSidebar();
  }, [closeSidebar, location]);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && "overflow-hidden"
      }`}
    >
      {/* <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 `}> */}
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                return route.component ? (
                  <AuthRoute
                    key={i}
                    exact={true}
                    path={`/app${route.path}`}
                    render={(props: any) => <route.component {...props} />}
                    component={(props: any) => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Redirect exact from="/app" to="/app/dashboard" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
    </div>
  );
}

export default Layout;
