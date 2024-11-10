import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import CompanyAccountsTable from "../../components/CompanyAccountsTable";
import {useHistory} from 'react-router-dom'
import api from "../../Api";
import { toast } from 'react-hot-toast';

const ListCompanyAccounts = () => {
    // Data & states
        const history = useHistory()

        const [companyAccounts, setCompanyAccounts] = useState([]);

    // Methods

    const routeToCreatePage = (e) => {
        e.preventDefault();
        history.push('/company/create-company-account')
    }

    const routeToTopUpPage = (e) => {
      e.preventDefault();
      history.push('/company/top-up-company-account')
    }

    useEffect(()=>{
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'GET_COMPANY_ACCS',
            };
        
            try {
              let response = await api.create(payload);
              if (response.ResponseCode === '000') {
                setCompanyAccounts(response.Accounts)
              } else {
                toast.error("Error: Failure to get company account types");
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
            <PageTitle>Manage Company Accounts</PageTitle>

            <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={routeToTopUpPage}
            >
                Top Up Company account
            </button>

            <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={routeToCreatePage}
            >
                Add company account
                <span className="ml-2" aria-hidden="true">
                    +
                </span>
            </button>

        </div>


        <CompanyAccountsTable resultsPerPage={10} companyAccounts={companyAccounts} />
    </div>
  );
};

export default ListCompanyAccounts;
