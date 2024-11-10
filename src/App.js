import React, { lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";

import { useHistory } from "react-router-dom";

import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import { Toaster } from 'react-hot-toast';
import SessionExpiryPopup from "./components/SessionExpiry";


const AgentLayout = lazy(() => import("./containers/AgentLayout"));
const CompanyLayout = lazy(() => import("./containers/CompanyLayout"));
const ChargeLayout = lazy(() => import("./containers/ChargeLayout"));
const SettingsLayout = lazy(() => import("./containers/SettingsLayout"));
const BranchLayout = lazy(() => import("./containers/BranchLayout"));
const TransactionLayout = lazy(() => import("./containers/TransactionLayout"));
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const UpdateUserPassword = lazy(() => import("./pages/user/UpdateUserPassword"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

function App() {
  // Data
  const history = useHistory();

  // Methods

  useEffect(() => {
    const checkSessionExpiry = () => {
      const sessionData = JSON.parse(localStorage.getItem("user"));
      

      if (sessionData && sessionData.SessionExpiry) {
        const expiryTime = new Date(sessionData.SessionExpiry).getTime();
        const currentTime = new Date().getTime();

        if (currentTime >= expiryTime) {
          
          localStorage.clear();
          history.push("/login");
        }
      }
    };

    checkSessionExpiry();
    const interval = setInterval(checkSessionExpiry, 60000);

    return () => clearInterval(interval);
  }, [history]);

  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />

        <TitleUpdater />

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/update-user-password/:email" component={UpdateUserPassword} />

          <Route path="/app" component={Layout} />

          <Route path="/settings" component={SettingsLayout} />

          <Route path="/company" component={CompanyLayout} />

          <Route path="/branch" component={BranchLayout} />

          <Route path="/agent" component={AgentLayout} />

          <Route path="/charge" component={ChargeLayout} />

          <Route path="/transaction" component={TransactionLayout} />

          <Redirect exact from="/" to="/login" />
        </Switch>

        <Toaster />
        <SessionExpiryPopup />
      </Router>
    </>
  );
}

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/settings/create-user':
        document.title = 'RX | Settings - Create User';
        break;
      case '/settings/list-pending-users':
        document.title = 'RX | Settings - Pending Users';
        break;
      case '/settings/list-users':
        document.title = 'RX | Settings - Approved Users';
        break;

      case '/settings/list-user-types':
        document.title = 'RX | Settings - User Types';
        break;
      case '/settings/map-user-to-role':
        document.title = 'RX | Settings - Map role to user';
        break;

      case '/settings/list-roles':
        document.title = 'RX | Settings - Roles';
        break;

      case '/settings/list-role-details':
        document.title = 'RX | Settings - Role Details';
        break;

      case '/settings/list-permissions':
        document.title = 'RX | Settings - Permissions';
        break;

      case '/settings/list-permission-details':
        document.title = 'RX | Settings - Permission Details';
        break;

      case '/settings/list-countries':
        document.title = 'RX | Settings - Countries';
        break;

      case '/settings/list-cities':
        document.title = 'RX | Settings - Cities';
        break;

      case '/settings/list-currencies':
        document.title = 'RX | Settings - Currencies';
        break;

      case '/settings/list-document-types':
        document.title = 'RX | Settings - Document Types';
        break;

      case '/settings/list-account-types':
        document.title = 'RX | Settings - Account Types';
        break;

      case '/settings/list-delivery-methods':
        document.title = 'RX | Settings - Delivery Methods';
        break;

      case '/settings/create-role':
        document.title = 'RX | Settings - Create role';
        break;

      case '/settings/add-role-to-permission':
        document.title = 'RX | Settings - Add Role To Permission';
        break;

      case '/settings/create-permission':
        document.title = 'RX | Settings - Create Permission';
        break;

      case '/agent/list-agents':
        document.title = 'RX | Agent - All agents';
        break;

      case '/agent/create-agent-account':
        document.title = 'RX | Agent - Create Agent Account';
        break;

      case '/agent/list-country-agents':
        document.title = 'RX | Agent - Country Agents';
        break;

      case '/agent/list-agent-accounts':
        document.title = 'RX | Agent - Agent Accounts';
        break;

      case '/agent/create-agent-commission':
        document.title = 'RX | Agent - Commission Set Up';
        break;

      case '/charge/list-charge-setups':
        document.title = 'RX | Charge - Charge Setups';
        break;

      case '/charge/create-charge':
        document.title = 'RX | Charge - Create Charge';
        break;

      case '/transaction/list-transactions':
        document.title = 'RX | Transaction - Transactions';
        break;

      case '/transaction/create-transaction':
        document.title = 'RX | Transaction - Create Transaction';
        break;

      case '/transaction/commission':
        document.title = 'RX | Transaction - Commission';
        break;

      case '/company/list-company-account-types':
        document.title = 'RX | Company - Company Account Types';
        break;

      case '/company/list-company-accounts':
        document.title = 'RX | Company - Company Accounts';
        break;

      case '/company/top-up-company-account':
        document.title = 'RX | Company - Top Up Company Account';
        break;

      case '/company/create-company-account':
        document.title = 'RX | Company - Create Company Account';
        break;

      case '/branch/list-branches':
        document.title = 'RX | Branch - All Branches';
        break;

      case '/branch/list-all-country-managers':
        document.title = 'RX | Branch - All Country Managers';
        break;

      case '/branch/list-country-managers':
        document.title = 'RX | Branch - Managers Per Country';
        break;

      case '/branch/list-branch-accounts':
        document.title = 'RX | Branch - Accounts Per Branch';
        break;

      case '/branch/create-rate':
        document.title = 'RX | Branch - Create Rate';
        break;

      case '/branch/create-branch-account':
        document.title = 'RX | Branch - Create Branch Account';
        break;

      case '/branch/list-branch-account-balances':
        document.title = 'RX | Branch - Balances Per Branch Account';
        break;

      case '/branch/top-up-branch-balance':
        document.title = 'RX | Branch - Top Up Branch Account Balance';
        break;

      case '/branch/top-up-agent-account':
        document.title = 'RX | Branch - Top Up Agent Account Balance';
        break;

      case '/app/list-user':
        document.title = 'RX | App - Approved Users';
        break;

      default:
        document.title = 'aB | Dashboard';
    }
  }, [location]);

  return null; 
};

export default App;


