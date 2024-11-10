import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import ListCommissionsTable from "../../components/ListCommissionsTable";
import api from "../../Api";
import { toast } from 'react-hot-toast';

const ListCommission = () => {
    // Data & states

        const [commissions, setCommissions] = useState([]);

    // Methods

    useEffect(()=>{
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'GET_HQ_BRANCHES_COMMISSION_DISTRIBUTION',
            };
        
            try {
              let response = await api.create(payload);
              if (response.ResponseCode === '000') {
                const data = Array.isArray(response.CommDistribution) ? response.CommDistribution : [response.CommDistribution];
                setCommissions(data);
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
            <PageTitle>HQ Branches Commission Distribution</PageTitle>
        </div>


        <ListCommissionsTable resultsPerPage={10} commissions={commissions} />
    </div>
  );
};

export default ListCommission;
