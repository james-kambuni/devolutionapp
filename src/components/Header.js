import React, { useContext, useState, useEffect } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { useUser } from '../context/UserContext';
import {
  MoonIcon,
  SunIcon,
  MenuIcon,
  OutlineLogoutIcon,
} from "../icons";
import {
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress, faUser } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import { useHistory } from "react-router-dom";

function Header() {
  // Data and states
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { user } = useUser();

  const history = useHistory();

  // Methods
  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isFullScreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullScreen]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('sessionToken');
    toast.success("Logout successfully, Bye!");
    history.push('/login');
  }

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        <div className="flex justify-center flex-1 lg:mr-32"></div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === "dark" ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
          <li className="flex items-center">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple flex items-center"
              onClick={toggleFullScreen}
              aria-label={isFullScreen ? "Exit full screen" : "Go full screen"}
            >
              <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand} className="w-5 h-5" />
            </button>
          </li>

          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none flex items-center gap-2"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
              <p className="hidden md:flex">{user?.userName}</p>
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem onClick={(e) => handleLogout(e)}>
                <OutlineLogoutIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
