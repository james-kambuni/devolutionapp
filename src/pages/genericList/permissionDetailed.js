import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import PermissionsDetailedTable from "../../components/PermissionDetailedTable";
import api from "../../Api";
import { toast } from 'react-hot-toast';

const PermissionDetailed = () => {
    // Data & states

        const [permissionsDetailed, setPermissionsDetailed] = useState([]);

    // Methods

    useEffect(()=>{
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'GET_PERMISSIONS_DETAILED',
            };
        
            try {
              let response = await api.create(payload);
              
              if (response.ResponseCode === '000') {
                setPermissionsDetailed(response.Permissions)
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
            <PageTitle>Permissions Details</PageTitle>
        </div>


        <PermissionsDetailedTable resultsPerPage={10} permissions={permissionsDetailed} />
    </div>
  );
};

export default PermissionDetailed;
