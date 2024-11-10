import React, { useEffect, useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import BranchAccountsTable from "../../components/BranchAccountsTable";
import { useHistory } from 'react-router-dom';
import api from "../../Api";
import { toast } from 'react-hot-toast';
import Select from 'react-select';

const ListBranchAccount = () => {
    // Data & states
    const history = useHistory();

    const [branchAccounts, setBranchAccounts] = useState([]);
    const [branches, setBranches] = useState([]);

    const [formData, setFormData] = useState({
        BranchId: '3'
    });

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

    // Fetch Branch Accounts when BranchId changes
    useEffect(() => {
        if (formData.BranchId) {
            const getData = async () => {
                const payload = {
                    ServiceCode: 'GET_BRANCH_ACCOUNTS',
                    BranchId: formData.BranchId
                };

                try {
                    let response = await api.create(payload);
                    if (response.ResponseCode === '000') {
                        setBranchAccounts(response.Accounts);
                    } else {
                        toast.error("Error: " + response.ResponseDescription);
                    }
                } catch (error) {
                    toast.error('Error: ' + error);
                }
            };

            getData();
        }
        }, [formData.BranchId]); // Re-fetch accounts when BranchId changes

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

    const routeToCreatePage = (e) => {
        e.preventDefault();
        history.push('/branch/create-branch-account');
    };

    const routeToCreateRatePage = (e) => {
        e.preventDefault();
        history.push('/branch/create-rate');
    };

    return (
        <div className="flex flex-col py-8">
            <div className="flex items-center justify-between">
                <PageTitle>Manage Branch Accounts</PageTitle>
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
                onClick={routeToCreateRatePage}
                >
                    Add rate
                </button>

                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={routeToCreatePage}
                >
                    Add branch account
                    <span className="ml-2" aria-hidden="true">+</span>
                </button>
            </div>

            <BranchAccountsTable resultsPerPage={10} branchAccounts={branchAccounts} />
        </div>
    );
};

export default ListBranchAccount;
