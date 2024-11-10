import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import AgentsTable from "../../components/AgentsTable";
import {useHistory} from 'react-router-dom'
import api from "../../Api";
import { toast } from 'react-hot-toast';

const ListAgent = () => {
    // Data & states
        const history = useHistory()

        const [agents, setAgents] = useState([]);

    // Methods

    const routeToCreatePage = (e) => {
        e.preventDefault();
        history.push('/agent/create-agent-account')
    }

    useEffect(()=>{
        const getData = async (e) => {
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

        getData()
    },[])

  return (
    <div className="flex flex-col py-8">
        <div className="flex items-center justify-between">
            <PageTitle>Manage All Agents</PageTitle>
            <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={routeToCreatePage}
            >
                Add Agent Account
                <span className="ml-2" aria-hidden="true">
                    +
                </span>
            </button>

        </div>


        <AgentsTable resultsPerPage={10} agents={agents} />
    </div>
  );
};

export default ListAgent;
