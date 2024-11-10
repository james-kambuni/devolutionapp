import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import BranchesTable from "../../components/BranchesTable";
import api from "../../Api";
import { toast } from 'react-hot-toast';

const ListBranch = () => {
    // Data & states

        const [branches, setBranches] = useState([]);

    // Methods

    useEffect(()=>{
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'GET_BRANCHES',
            };
        
            try {
              let response = await api.create(payload);
              if (response.ResponseCode === '000') {
                setBranches(response.Branches)
              } else {
                toast.error("Error: Failure to get branches");
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
            <PageTitle>Manage Branches</PageTitle>
        </div>


        <BranchesTable resultsPerPage={10} branches={branches} />
    </div>
  );
};

export default ListBranch;
