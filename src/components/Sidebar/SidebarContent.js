import React from "react";
import routes from "../../routes/sidebar";
import { NavLink, Route, Link, useHistory } from "react-router-dom";
import * as Icons from "../../icons";
import SidebarSubmenu from "./SidebarSubmenu";
import { toast } from 'react-hot-toast';
import { useUser } from "../../context/UserContext";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarContent() {
  // Data and states
  const history = useHistory();

  const {user} = useUser()

  // Methods
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('user');
    toast.success("Logout successfully, Bye!");
    history.push('/login');
  }

  const filteredRoutes = routes.filter(route => 
    route.userType.includes(user.UserType)
  );

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <Link
        className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
        to="/app/dashboard"
      >
        <img src="/logo/light.png" alt="" className="w-full px-4" />
      </Link>
      <ul className="mt-6">
        {filteredRoutes.map((route) =>
            route.routes ? (
              <SidebarSubmenu route={route} key={route.name} />
            ) : (
              <li className="relative px-6 py-3" key={route.name}>
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
                  <Icon
                    className="w-5 h-5"
                    aria-hidden="true"
                    icon={route.icon}
                  />
                  <span className="ml-4">{route.name}</span>
                </NavLink>
              </li>
            )
          )}

        <li className="relative px-6 py-3">
          <button
            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            onClick={handleLogout}
          >
            <Icon
              className="w-5 h-5"
              aria-hidden="true"
              icon="OutlineLogoutIcon"
            />
            <span className="ml-4">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SidebarContent;
