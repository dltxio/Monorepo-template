import React from "react";
import { NavLink, Route } from "react-router-dom";

import { Button } from "../../";
import logo from "../../../assets/img/powerplay-logo.png";
import * as Icons from "../../../icons";
import routes from "../../../routes/sidebar";
import SidebarSubmenu from "./SidebarSubmenu";

function Icon({ icon, ...props }: { icon: keyof typeof Icons }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarContent() {
  return (
    <div className="text-gray-500 dark:text-gray-400">
      <img className="px-8 py-4" src={logo} alt={"PowerPlay"} loading="lazy" />
      <ul className="mt-6">
        {routes.map(route =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li
              className="relative px-6 py-3 hover:bg-gray-100"
              key={route.name}
            >
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="text-gray-800 dark:text-gray-100 "
              >
                {/* <Route path={route.path} exact={route.exact}> */}
                <Route path={route.path}>
                  <span
                    className="absolute inset-y-0 left-0 w-2 bg-blue-600 rounded-tr-lg rounded-br-lg "
                    aria-hidden="true"
                  ></span>
                </Route>
                <div className="w-7 h-7 text-gray-500">
                  <Icon aria-hidden="true" icon={route.icon as any} />
                </div>
                <span className="ml-4 text-base">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
      <div className="px-6 my-6">
        <Button>
          Complete Signup
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
      </div>
    </div>
  );
}

export default SidebarContent;
