import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import AgentAccountsTable from "../../components/AgentAccountsTable";
import {useHistory} from 'react-router-dom'
import api from "../../Api";
import { toast } from 'react-hot-toast';
import Select from 'react-select';

const ListAgentAccounts = () => {
    // Data & states
        const history = useHistory()

        const [agentAccounts, setAgentAccounts] = useState([]);

        const [agents, setAgents] = useState([]);

        const [formData, setFormData] = useState({
          AgentUserId: '1017' 
      });
    // Methods

    const routeToCreatePage = (e) => {
        e.preventDefault();
        history.push('/agent/create-agent-account')
    }

    const routeToCreateCommissionSetupPage = (e) => {
      e.preventDefault();
      history.push('/agent/create-agent-commission')
    }

    useEffect(()=>{
      const getAgents = async (e) => {
        const payload = {
          ServiceCode: 'GET_ALL_AGENTS',
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

      getAgents()
    },[])

    useEffect(()=>{
      if (formData.AgentUserId) {
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'GET_AGENT_ACCOUNTS',
              AgentUserId: formData.AgentUserId
            };
        
            try {
              let response = await api.create(payload);
              if (response.ResponseCode === '000') {
                setAgentAccounts(response.Agents)
              } else {
                toast.error(response.ResponseDescription);
              }
            } catch (error) {
              toast.error('Error: ' + error);
            }
          };

        getData()
      }
    },[formData.AgentUserId])

    const agentOptions = agents.map((agent) => ({
        value: agent.UserId,
        label: `${agent.FirstName} ${agent.MiddleName} ${agent.LastName}`, 
    }));

    // Handle country selection
    const handleSelectChange = (selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            AgentUserId: selectedOption.value,
        }));
    };

  return (
    <div className="flex flex-col py-8">
        <div className="flex items-center justify-between">
            <PageTitle>Manage All Agent Accounts</PageTitle>

            <div className="">
                <Select
                    id="AgentUserId"
                    name="AgentUserId"
                    value={agentOptions.find((option) => option.value === formData.AgentUserId)}
                    onChange={handleSelectChange}
                    options={agentOptions}
                    placeholder="Select agent"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                />
            </div>

            <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={routeToCreateCommissionSetupPage}
            >
                Commission Set up
            </button>

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


        <AgentAccountsTable resultsPerPage={10} agentAccounts={agentAccounts} />
    </div>
  );
};

export default ListAgentAccounts;
