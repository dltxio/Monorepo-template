import React from "react";
import { lazy } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation
} from "react-router-dom";
import { SWRConfig } from "swr";

import AccessibleNavigationAnnouncer from "./components/dashboard/AccessibleNavigationAnnouncer";
import Layout from "./containers/Layout";
import CreateAccount from "./pages/CreateAccount";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import { ApiProvider } from "./providers/Api";
import { AuthProvider } from "./providers/Auth";
import AuthRoute from "./utils/authRoute";

// const Layout = lazy(async () => import('./containers/Layout'));
// const Login = lazy(async () => import('./pages/Login'));
// const CreateAccount = lazy(async () => import('./pages/CreateAccount'));
// const ForgotPassword = lazy(async () => import('./pages/ForgotPassword'));

type Props = {};

const App: React.FC<Props> = props => {
  const swrConfig = {
    fetcher: (url: string) => url,
    shouldRetryOnError: false
  };

  return (
    <SWRConfig value={swrConfig}>
      <Router>
        <AccessibleNavigationAnnouncer />
        <ApiProvider>
          <AuthProvider>
            <Switch>
              <Route path="/login" render={props => <Login />} />

              <Route
                path="/create-account"
                render={props => <CreateAccount />}
              />
              <Route
                path="/forgot-password"
                render={props => <ForgotPassword />}
              />
              <Route
                path="/verify-email"
                render={(props: any) => <VerifyEmail {...props} />}
              />

              <Route path="/app" render={() => <Layout />} />

              {/* <Route path="/login" component={Login} /> */}
              {/* <Route path="/create-account" component={CreateAccount} /> */}
              {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
              {/* Place new routes over this */}
              {/* <Route path="/app" component={Layout} /> */}
              {/* If you have an index page, you can remove this Redirect */}
              <Redirect exact from="/" to="/login" />
            </Switch>
          </AuthProvider>
        </ApiProvider>
      </Router>
    </SWRConfig>
  );
};

export default App;
