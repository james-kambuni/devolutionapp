import React, { lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import { Toaster } from 'react-hot-toast';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import CaseStudy from "./pages/CaseStudy";
import Portfolio from "./pages/Portfolio";

const AgentLayout = lazy(() => import("./containers/AgentLayout"));
const CompanyLayout = lazy(() => import("./containers/CompanyLayout"));
const ChargeLayout = lazy(() => import("./containers/ChargeLayout"));
const SettingsLayout = lazy(() => import("./containers/SettingsLayout"));
const BranchLayout = lazy(() => import("./containers/BranchLayout"));
const TransactionLayout = lazy(() => import("./containers/TransactionLayout"));
const Layout = lazy(() => import("./containers/Layout"));
const UpdateUserPassword = lazy(() => import("./pages/user/UpdateUserPassword"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        
        <Navbar />
        <TitleUpdater />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/contact-us" component={Contact} />
          <Route exact path="/single-blog" component={Blog} />
          <Route exact path="/case-study" component={CaseStudy} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/portfolio-details" component={Portfolio} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/update-user-password/:email" component={UpdateUserPassword} />

          <Route path="/app" component={Layout} />
          <Route path="/settings" component={SettingsLayout} />
          <Route path="/company" component={CompanyLayout} />
          <Route path="/branch" component={BranchLayout} />
          <Route path="/agent" component={AgentLayout} />
          <Route path="/charge" component={ChargeLayout} />
          <Route path="/transaction" component={TransactionLayout} />
        </Switch>
        
        <Footer />
        <Toaster />
      </Router>
    </>
  );
}

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        document.title = 'Ugatuzi Kenya - Home page';
        break;
      case '/contact-us':
        document.title = 'Ugatuzi Kenya - Contact us page';
        break;

      case '/single-blog':
        document.title = 'Ugatuzi Kenya - Blogs page';
        break;

      case '/case-study':
        document.title = 'Ugatuzi Kenya - Case study page';
        break;

      case '/portfolio-details':
        document.title = 'Ugatuzi Kenya - Portfolio page';
        break;

      default:
        document.title = 'Ugatuzi Kenya';
    }
  }, [location]);

  return null; 
};

export default App;
