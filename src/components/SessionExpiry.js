import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext'; 

const SessionExpiryPopup = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showPopup, setShowPopup] = useState(false); 
  const { SessionExpiry, logoutUser } = useUser(); 
  const history = useHistory();
  const location = useLocation(); 

  const saveRouteBeforeLogout = useCallback(() => {
    localStorage.setItem('lastRoute', location.pathname);
  }, [location.pathname]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    const handleLogout = () => {
      setShowPopup(false);
      logoutUser(); 
      history.push('/login');
    };

    if (SessionExpiry) {
      const expiryDate = new Date(SessionExpiry);
      const interval = setInterval(() => {
        const currentTime = new Date();
        const timeRemaining = expiryDate - currentTime;

        if (timeRemaining > 0) {
          setTimeRemaining(Math.floor(timeRemaining / 1000));

          if (timeRemaining <= 5 * 60 * 1000 && !showPopup) {
            setShowPopup(true);
          }
        } else {
          clearInterval(interval);
          saveRouteBeforeLogout();
          handleLogout();
        }
      }, 1000); 

      return () => clearInterval(interval); 
    }
  }, [SessionExpiry, showPopup, saveRouteBeforeLogout, logoutUser, history]);

  return (
    <>
      {showPopup && timeRemaining > 0 && (
        <div className="popup">
          <p>Your session will expire in {formatTime(timeRemaining)} minutes!</p>
          <button onClick={() => {
            setShowPopup(false);
            logoutUser(); 
            history.push('/login');
          }}>Logout Now</button>
        </div>
      )}
    </>
  );
};

export default SessionExpiryPopup;
