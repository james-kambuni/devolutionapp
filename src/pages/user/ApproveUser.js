import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import PendingUsersTable from "../../components/PendingUsersTable";
import {useHistory} from 'react-router-dom'
import api from "../../Api";
import { toast } from 'react-hot-toast';

const ApproveUser = () => {
    // Data & states
        const history = useHistory()

        const [users, setUsers] = useState([]);

    // Methods

    const routeToCreatePage = (e) => {
        e.preventDefault();
        history.push('/settings/create-user')
    }

    useEffect(()=>{
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'PENDING_VERIFICATION',
            };
        
            try {
              let response = await api.create(payload);
              if (response.ResponseCode === '000') {
                setUsers(response.Users)
              } else {
                toast.error("Error: Failure to get users");
              }
            } catch (error) {
              toast.error('Error: ' + error);
            }
          };

        getData()
    },[])

  return (
    <div className="flex flex-col py-8">
        <div className="flex items-center justify-between">
            <PageTitle>Manage Pending Users</PageTitle>
            <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={routeToCreatePage}
            >
                Add user
                <span className="ml-2" aria-hidden="true">
                    +
                </span>
            </button>

        </div>


        <PendingUsersTable resultsPerPage={10} users={users} />
    </div>
  );
};

export default ApproveUser;
