import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import AgentsTable from "../../components/AgentsTable";
import {useHistory} from 'react-router-dom'
import api from "../../Api";
import { toast } from 'react-hot-toast';
import Select from 'react-select';  

const ListCountryAgent = () => {
    // Data & states
        const history = useHistory()

        const [agents, setAgents] = useState([]);

        const [branches, setBranches] = useState([]);
        const [formData, setFormData] = useState({
          BranchId: '4'
        });
    // Methods

    const routeToCreatePage = (e) => {
        e.preventDefault();
        history.push('/agent/create-agent-account')
    }

    useEffect(()=>{
        const getBranches = async () => {
            const payload = {
                ServiceCode: 'GET_BRANCHES',
            };

            try {
                let response = await api.create(payload);
                if (response.ResponseCode === '000') {
                    setBranches(response.Branches);
                } else {
                    toast.error("Error: Failure to get branches");
                }
            } catch (error) {
                toast.error('Error: ' + error);
            }
        };

        const getData = async (e) => {
            const payload = {
              ServiceCode: 'GET_AGS_PER_BRANCH',
              BranchId: "4"
            };
        
            try {
              let response = await api.create(payload);
              if (response.ResponseCode === '000') {
                setAgents(response.Agents)
              } else {
                toast.error("Error: Failure to get agents");
              }
            } catch (error) {
              toast.error('Error: ' + error);
            }
          };

        getBranches()
        getData()
    },[])


     // Fetch country managers when component mounts and when CountryCode changes
     useEffect(() => {
        if (formData.BranchId) {
            const getCountryManagers = async () => {
                const payload = {
                    ServiceCode: 'GET_AGS_PER_BRANCH',
                    BranchId: formData.BranchId
                };

                try {
                    let response = await api.create(payload);
                    if (response.ResponseCode === '000') {
                      setAgents(response.Agents);
                    } else {
                        toast.error("Error: " + response.ResponseDescription);
                    }
                } catch (error) {
                    toast.error('Error: ' + error);
                }
            };

            getCountryManagers();
        }
    }, [formData.BranchId]); // Re-fetch when CountryCode changes

    // Map country options for the select dropdown
    const branchOptions = branches.map((branch) => ({
        value: branch.BranchId,
        label: branch.BranchName, 
    }));

    // Handle country selection
    const handleSelectChange = (selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            BranchId: selectedOption.value,
        }));
    };

  return (
    <div className="flex flex-col py-8">
        <div className="flex items-center justify-between">
            <PageTitle>Manage Country Agents</PageTitle>
            <div className="">
                <Select
                    id="BranchId"
                    name="BranchName"
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
                Add agent account
                <span className="ml-2" aria-hidden="true">
                    +
                </span>
            </button>

        </div>


        <AgentsTable resultsPerPage={10} agents={agents} />
    </div>
  );
};

export default ListCountryAgent;
