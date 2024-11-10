import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import CompanyAccountTypesTable from "../../components/CompanyAccountTypesTable";
import api from "../../Api";
import { toast } from 'react-hot-toast';

const ListCompanyAccountTypes = () => {
    // Data & states

        const [companyAccountTypes, setCompanyAccountTypes] = useState([]);

    // Methods

    useEffect(()=>{
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'COMPANY_ACC_TYPES',
            };
        
            try {
              let response = await api.create(payload);
              if (response.ResponseCode === '000') {
                setCompanyAccountTypes(response.AccountTypes)
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
            <PageTitle>Manage Company Account Types</PageTitle>
        </div>


        <CompanyAccountTypesTable resultsPerPage={10} companyAccountTypes={companyAccountTypes} />
    </div>
  );
};

export default ListCompanyAccountTypes;
