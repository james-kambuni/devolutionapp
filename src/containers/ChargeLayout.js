import React, { useContext, Suspense, useEffect, lazy, useState, useRef } from 'react';
import { Switch, Route, Redirect, useLocation, NavLink } from 'react-router-dom';
import routes from '../routes';
import * as Icons from "../icons";
import SidebarSubmenu from "../components/Sidebar/SidebarSubmenu";
import chargeRoute from "../routes/charge";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Main from '../containers/Main';
import ThemedSuspense from '../components/ThemedSuspense';
import { SidebarContext } from '../context/SidebarContext';
import { useUser } from '../context/UserContext';

const Page404 = lazy(() => import('../pages/404'));

function Icon({ icon, ...props }) {
  const IconComponent = Icons[icon];
  return <IconComponent {...props} />;
}

function ChargeLayout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useLocation();
  const [isChargeSidebarOpen, setIsChargeSidebarOpen] = useState(false); 
  const sidebarRef = useRef(null);
  const {user} = useUser()

  useEffect(() => {
    closeSidebar();
  }, [location, closeSidebar]);

  const toggleChargeSidebar = () => {
    setIsChargeSidebarOpen(!isChargeSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsChargeSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isChargeSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChargeSidebarOpen]);

  const filteredRoutes = chargeRoute.filter(route => 
    route.userType.includes(user.UserType)
  );

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>
      <Sidebar />

      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Header />

        <div className="flex flex-col md:flex-row relative overflow-hidden">
          <button
            onClick={toggleChargeSidebar}
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ml-4"
          >
            <span className="sr-only">Open charge sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              />
            </svg>
          </button>

          {isChargeSidebarOpen && (
            <div className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden" onClick={toggleChargeSidebar}></div>
          )}

          <div
            ref={sidebarRef}
            className={`fixed pb-20 pt-5 inset-y-0 left-0 z-40 w-64 h-screen overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 transition-transform duration-300 transform bg-gray-100 dark:bg-gray-800 lg:static lg:inset-0 ${
              isChargeSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0`}
          >
            <div className="px-3 py-4 overflow-y-auto">

              <ul className="space-y-2 font-medium">
                {filteredRoutes.map((route) =>
                  route.routes ? (
                    <SidebarSubmenu route={route} key={route.name} />
                  ) : (
                    <li className="relative px-6 py-3 text-gray-800 dark:text-gray-200" key={route.name} onClick={()=>{
                        setIsChargeSidebarOpen(false)
                      }}>
                      <NavLink
                        exact
                        to={route.path}
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                        activeClassName="text-gray-800 dark:text-gray-100"
                      >
                        <Route path={route.path} exact={route.exact}>
                          <span
                            className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                            aria-hidden="true"
                          ></span>
                        </Route>
                        <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                        <span className="ml-4">{route.name}</span>
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <Main>
            <Suspense fallback={<ThemedSuspense />}>
              <Switch>
                {routes.map((route, i) => {
                  return route.component ? (
                    <Route
                      key={i}
                      exact={true}
                      path={`/charge${route.path}`}
                      render={(props) => <route.component {...props} />}
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
    </div>
  );
}

export default ChargeLayout;
