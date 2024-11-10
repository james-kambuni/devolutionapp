import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import RolesDetailedTable from "../../components/RolesDetailedTables";
import api from "../../Api";
import { toast } from 'react-hot-toast';

const RolesDetailed = () => {
    // Data & states
        const [rolesDetailed, setRolesDetailed] = useState([]);

    // Methods

    useEffect(()=>{
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'GET_ROLES_DETAILED',
            };
        
            try {
              let response = await api.create(payload);
              
              if (response.ResponseCode === '000') {
                setRolesDetailed(response.Roles)
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
            <PageTitle>Roles Details</PageTitle>
        </div>


        <RolesDetailedTable resultsPerPage={10} roles={rolesDetailed} />
    </div>
  );
};

export default RolesDetailed;
