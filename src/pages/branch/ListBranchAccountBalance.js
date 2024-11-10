import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import BranchAccountBalancesTable from "../../components/BranchAccountBalancesTable";
import {useHistory} from 'react-router-dom'
import api from "../../Api";
import { toast } from 'react-hot-toast';
import Select from 'react-select';

const ListBranchAccountBalance = () => {
    // Data & states
        const history = useHistory()

        const [branchAccountBalances, setBranchAccountBalances] = useState([]);

        const [branches, setBranches] = useState([]);

        const [formData, setFormData] = useState({
            BranchId: '3'
        });
    // Methods

    const routeToCreatePage = (e) => {
        e.preventDefault();
        history.push('/branch/top-up-branch-balance')
    }

    // Fetch Branches on Component Load
    useEffect(() => {
        const getBranches = async () => {
            const payload = {
                ServiceCode: 'GET_BRANCHES',
            };

            try {
                let response = await api.create(payload);
                if (response.ResponseCode === '000') {
                    setBranches(response.Branches);
                } else {
                    toast.error('Error: ' + response.ResponseDescription);
                }
            } catch (error) {
                toast.error('Error: ' + error);
            }
        };

        getBranches();
    }, []);

    useEffect(()=>{
      if (formData.BranchId) {
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'GET_BR_ACCOUNTS_W_BAL',
              BranchId: formData.BranchId 
            };
        
            try {
              let response = await api.create(payload);
              if (response.ResponseCode === '000') {
                setBranchAccountBalances(response.Accounts)
              } else {
                toast.error("Error: Failure to get country managers");
              }
            } catch (error) {
              toast.error('Error: ' + error);
            }
          };

        getData()
      }
    },[formData.BranchId])

    const branchOptions = branches.map((branch) => ({
        value: branch.BranchId,
        label: branch.BranchName,
    }));

    const handleSelectChange = (selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            BranchId: selectedOption.value,
        }));
    };

  return (
    <div className="flex flex-col py-8">
        <div className="flex items-center justify-between">
            <PageTitle>Manage Branch Account Balance</PageTitle>

            <div className="">
                <Select
                    id="BranchId"
                    name="BranchId"
                    value={branchOptions.find((option) => option.value === formData.BranchId)}
                    onChange={handleSelectChange}
                    options={branchOptions}
                    placeholder="Select Branch"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                />
            </div>

            <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={routeToCreatePage}
            >
                Top Up Branch balance
            </button>

        </div>


        <BranchAccountBalancesTable resultsPerPage={10} branchAccountBalances={branchAccountBalances} />
    </div>
  );
};

export default ListBranchAccountBalance;
