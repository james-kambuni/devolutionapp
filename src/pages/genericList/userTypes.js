import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import UserTypesTable from "../../components/UserTypesTable";
import api from "../../Api";
import { toast } from 'react-hot-toast';

const UserTypes = () => {
    // Data & states
        const [userTypes, setUserTypes] = useState([]);

    // Methods

    useEffect(()=>{
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'GET_USER_TYPES',
            };
        
            try {
              let response = await api.create(payload);
              
              if (response.ResponseCode === '000') {
                setUserTypes(response.UserTypes)
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
            <PageTitle>User types</PageTitle>
        </div>


        <UserTypesTable resultsPerPage={10} userTypes={userTypes} />
    </div>
  );
};

export default UserTypes;
