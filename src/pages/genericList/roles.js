import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import RolesTable from "../../components/RolesTable";
import {useHistory} from 'react-router-dom'
import api from "../../Api";
import { toast } from 'react-hot-toast';

const Roles = () => {
    // Data & states
        const history = useHistory()

        const [roles, setRoles] = useState([]);

    // Methods

    const routeToCreatePage = (e) => {
        e.preventDefault();
        history.push('/settings/create-role')
    }

    const routeToAddRoleToPermission = (e) => {
      e.preventDefault();
      history.push('/settings/add-role-to-permission')
    }

    useEffect(()=>{
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'GET_ROLES',
            };
        
            try {
              let response = await api.create(payload);
              
              if (response.ResponseCode === '000') {
                setRoles(response.Roles)
              } else {
                toast.error("Error: Failure to get user types");
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
            <PageTitle>Roles</PageTitle>
            <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={routeToAddRoleToPermission}
            >
                Add role to permission
            </button>
            <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={routeToCreatePage}
            >
                Add role
                <span className="ml-2" aria-hidden="true">
                    +
                </span>
            </button>

        </div>


        <RolesTable resultsPerPage={10} roles={roles} />
    </div>
  );
};

export default Roles;
