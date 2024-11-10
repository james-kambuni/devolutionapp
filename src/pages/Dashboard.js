import React from "react";
import PageTitle from "../components/Typography/PageTitle";
import BranchDashboard from "./BranchDashboard";
import { useUser } from '../context/UserContext';
import AgentDashboard from "./AgentDashboard";
import AdminDashboard from "./AdminDashboard";

function Dashboard() {
  const {user} = useUser()

  return (
    <>
      <PageTitle>Hi, {user.userName}</PageTitle>

      {(user?.UserType === 'SYS') &&
        <AdminDashboard />
      }

      {user?.UserType === 'AG' && 
        <AgentDashboard />
      }

      {user?.UserType === 'CM' && 
        <BranchDashboard />
      }
    </>
  );
}

export default Dashboard;
