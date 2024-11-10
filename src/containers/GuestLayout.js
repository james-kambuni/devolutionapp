import React, { useContext, Suspense, useEffect, lazy, useState, useRef } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import routes from '../routes';
import Header from '../components/Header';
import Main from '../containers/Main';
import ThemedSuspense from '../components/ThemedSuspense';
import { SidebarContext } from '../context/SidebarContext';

const Page404 = lazy(() => import('../pages/404'));


function GuestLayout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useLocation();
  const [isSettingsSidebarOpen, setIsSettingsSidebarOpen] = useState(false); 
  const sidebarRef = useRef(null);

  useEffect(() => {
    closeSidebar();
  }, [location, closeSidebar]);


  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSettingsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSettingsSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsSidebarOpen]);

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>

      <div className="flex flex-col flex-1 w-full overflow-hidden">
          <Header />

          <Main>
            <Suspense fallback={<ThemedSuspense />}>
              <Switch>
                {routes.map((route, i) => {
                  return route.component ? (
                    <Route
                      key={i}
                      exact={true}
                      path={`/settings${route.path}`}
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
  );
}

export default GuestLayout;
