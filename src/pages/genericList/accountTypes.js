import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import AccountTypesTable from "../../components/AccountTypesTable";
import api from "../../Api";
import { toast } from 'react-hot-toast';

const AccountTypes = () => {
    // Data & states

        const [accounts, setAccounts] = useState([]);

    // Methods

    useEffect(()=>{
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'GET_ACCOUNT_TYPES',
            };
        
            try {
              let response = await api.create(payload);
              
              if (response.ResponseCode === '000') {
                setAccounts(response.AccountTypes)
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
            <PageTitle>Account Types</PageTitle>
        </div>


        <AccountTypesTable resultsPerPage={10} accounts={accounts} />
    </div>
  );
};

export default AccountTypes;
