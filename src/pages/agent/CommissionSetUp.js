import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../Api';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';  
import { Button } from '@windmill/react-ui';

function CommissionSetUp() {
  // Data & states
  const [formData, setFormData] = useState({
    BranchId: '',
    AgentId: '',
    AgentEarning: '',
    Commission: '',
    BranchCommission: '',
  });

  const history = useHistory();
  const [branches, setBranches] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Methods
  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ServiceCode: 'AGENT_COMMISSION_SETUP',
      ...formData,
    };

    try {
      let response = await api.create(payload);

      if (response.Response === '000') {
        setLoading(false);
        toast.success(response.ResponseDescription);
        setFormData({
          BranchId: '',
          AgentId: '',
          AgentEarning: '',
          Commission: '',
          BranchCommission: '',
        });
        history.push('/agent/create-agent-account');
      } else {
        setLoading(false);
        toast.error(response.ResponseDescription);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Company Account Registration Failure: ' + error);
    }
  };

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
          toast.error('Error: Failure to get branches');
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };


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

    getBranches();
    getAgents();
  }, []);

  const branchOptions = branches.map((branch) => ({
    value: branch.BranchId,
    label: branch.BranchName,
  }));

  const agentOptions = agents.map((agent) => ({
    value: agent.UserId,
    label: `${agent.FirstName} ${agent.MiddleName} ${agent.LastName}`,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange10 = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      AgentEarning: value,
    }));
  };

  return (
    <div className="flex flex-col py-8">
      <form
        className="w-full self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 rounded-md flex flex-col shadow-sm"
        onSubmit={handleSubmit}
      >
        <PageTitle>Agent Commission Set Up</PageTitle>

        <div className="mb-5">
          <label htmlFor="BranchId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Branch
          </label>
          <Select
            id="BranchId"
            name="BranchId"
            value={branchOptions.find((option) => option.value === formData.BranchId)}
            onChange={handleSelectChange}
            options={branchOptions}
            placeholder="Select branch"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>


        <div className="mb-5">
          <label htmlFor="AgentId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Agent
          </label>
          <Select
            id="AgentId"
            name="AgentId"
            value={agentOptions.find((option) => option.value === formData.AgentId)}
            onChange={handleSelectChange}
            options={agentOptions}
            placeholder="Select agent"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="AgentEarning" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Agent Earning
          </label>

          <select
            id="AgentEarning"
            name="AgentEarning"
            value={formData.AgentEarning}
            onChange={handleSelectChange10}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          >
            <option value="">Select ...</option>
            <option value="CommissionBased">Commission Based</option>
            <option value="SalaryBased">Salary Based</option>
          </select>
        </div>

        <div className='flex flex-col items-center md:flex-row gap-4 mb-4'>
          <div className="flex-1">
            <label htmlFor="Commission" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Commission [%]
            </label>
            <input
              type="number"
              step="any"
              id="Commission"
              name="Commission"
              value={formData.Commission}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="BranchCommission" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Branch Commission [%]
            </label>
            <input
              type="number"
              step="any"
              id="BranchCommission"
              name="BranchCommission"
              value={formData.BranchCommission}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            />
          </div>
        </div>

        <Button className="mt-4" block type="submit" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center">
              Loading...
            </span>
          ) : (
            "Commission Set Up"
          )}
        </Button>
      </form>
    </div>
  );
}

export default CommissionSetUp;
