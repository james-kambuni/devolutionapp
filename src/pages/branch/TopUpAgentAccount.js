import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../Api';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';  
import { Button } from '@windmill/react-ui';

function TopUpAgentAccount() {
  // Data & states
  const [formData, setFormData] = useState({
    BranchAccountNo: '',
    AgentAccountNo: '',
    CurrencyCode: '',
    Narration: ''
  });

  const history = useHistory();
  const [currencies, setCurrencies] = useState([]);

  const [branchAccounts, setBranchAccounts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [formData2, setFormData2] = useState({
    BranchId: '3'
  });

  const [agentAccounts, setAgentAccounts] = useState([]);

  const [agents, setAgents] = useState([]);

  const [formData3, setFormData3] = useState({
        AgentUserId: '1017' 
    });

  const [loading, setLoading] = useState(false);

  // Methods
  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption.value,
    }));
  };

  const handleSelectChange2 = (selectedOption, { name }) => {
    setFormData2((prevData) => ({
      ...prevData,
      [name]: selectedOption.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ServiceCode: 'TRANSFER_TO_AGENT',
      ...formData,
    };

    try {
      let response = await api.create(payload);

      if (response.Response === '000') {
        setLoading(false);
        toast.success(response.ResponseDescription);
        setFormData({
            BranchAccountNo: '',
            AgentAccountNo: '',
            CurrencyCode: '',
            Narration: ''
        });
        history.push('/agent/list-agents');
      } else {
        setLoading(false);
        toast.error('Branch Account Registration Failure: ' + response.ResponseDescription);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Branch Account Registration Failure: ' + error);
    }
  };

  useEffect(() => {
    const getCurrencies = async () => {
      const payload = {
        ServiceCode: 'GET_CURRENCIES',
      };

      try {
        let response = await api.create(payload);
        if (response.ResponseCode === '000') {
          setCurrencies(response.Currencies);
        } else {
          toast.error('Error: Failure to get currencies');
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };

    const getAgentAccounts = async (e) => {
        const payload = {
          ServiceCode: 'GET_COMPANY_ACCS',
        };
    
        try {
          let response = await api.create(payload);
          if (response.ResponseCode === '000') {
            setAgentAccounts(response.Accounts)
          } else {
            toast.error("Error: Failure to get company account types");
          }
        } catch (error) {
          toast.error('Error: ' + error);
        }
      };

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

      getCurrencies();
      getAgentAccounts();
      getBranches();
      getAgents();
    }, []);

  const currencyOptions = currencies.map((currency) => ({
    value: currency.CurrencyCode,
    label: currency.CurrencyName,
  }));


  const agentAccountOptions = agentAccounts.map((agentAccount) => ({
    value: agentAccount.FloatAccount,
    label: agentAccount.CurrencyCode,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(()=>{
    if (formData3.AgentUserId) {
      const getData = async (e) => {
          const payload = {
            ServiceCode: 'GET_AGENT_ACCOUNTS',
            AgentUserId: formData3.AgentUserId
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
  },[formData3.AgentUserId])

  const agentOptions = agents.map((agent) => ({
        value: agent.UserId,
        label: `${agent.FirstName} ${agent.MiddleName} ${agent.LastName}`, 
    }));

    // Handle country selection
    const handleSelectChange3 = (selectedOption) => {
        setFormData3((prevData) => ({
            ...prevData,
            AgentUserId: selectedOption.value,
        }));
    };

  useEffect(() => {
        if (formData2.BranchId) {
            const getData = async () => {
                const payload = {
                    ServiceCode: 'GET_BRANCH_ACCOUNTS',
                    BranchId: formData2.BranchId
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
    }, [formData2.BranchId]);

    const branchOptions = branches.map((branch) => ({
        value: branch.BranchId,
        label: branch.BranchName,
    }));


    const branchAccountOptions = branchAccounts.map((branchAccount) => ({
        value: branchAccount.FloatAccount,
        label: branchAccount.CurrencyCode,
      }));

  return (
    <div className="flex flex-col py-8">
      <form
        className="w-full self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 rounded-md flex flex-col shadow-sm"
        onSubmit={handleSubmit}
      >
        <PageTitle>Top Up Agent Account</PageTitle>
        <div className="mb-5">
            <label htmlFor="CompanyAccount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select Branch
            </label>
            <Select
                id="BranchId"
                name="BranchId"
                value={branchOptions.find((option) => option.value === formData2.BranchId)}
                onChange={handleSelectChange2}
                options={branchOptions}
                placeholder="Select Branch"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
            />
        </div>

        <div className="mb-5">
          <label htmlFor="BranchAccountNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Branch Account
          </label>
          <Select
            id="BranchAccountNo"
            name="BranchAccountNo"
            value={branchAccountOptions.find((option) => option.value === formData.BranchAccountNo)}
            onChange={handleSelectChange}
            options={branchAccountOptions}
            placeholder="Select branch account"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>

        <div className="mb-5">
            <label htmlFor="AgentAccountNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select Agent
            </label>
            <Select
                id="AgentUserId"
                name="AgentUserId"
                value={agentOptions.find((option) => option.value === formData.AgentUserId)}
                onChange={handleSelectChange3}
                options={agentOptions}
                placeholder="Select agent"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
            />
        </div>

        <div className="mb-5">
          <label htmlFor="AgentAccountNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Agent account number
          </label>
          <Select
            id="AgentAccountNo"
            name="AgentAccountNo"
            value={agentAccountOptions.find((option) => option.value === formData.AgentAccountNo)}
            onChange={handleSelectChange}
            options={agentAccountOptions}
            placeholder="Select agent account"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>

        <div className='flex flex-col md:flex-row items-center gap-4 mb-4'>
            <div className="flex-1">
            <label htmlFor="CurrencyCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select Currency
            </label>
            <Select
                id="CurrencyCode"
                name="CurrencyCode"
                value={currencyOptions.find((option) => option.value === formData.CurrencyCode)}
                onChange={handleSelectChange}
                options={currencyOptions}
                placeholder="Select Currency"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
            />
            </div>
            <div className="flex-1">
            <label htmlFor="Amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Amount
            </label>
            <input
                type="number"
                step="any"
                id="Amount"
                name="Amount"
                value={formData.Amount}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            />
            </div>
        </div>



        <div className="mb-5">
          <label htmlFor="Narration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Narration
          </label>
          <textarea
            id="Narration"
            name="Narration"
            value={formData.Narration}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <Button className="mt-4" block type="submit" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center">
              Loading...
            </span>
          ) : (
            "Top Up Agent Account"
          )}
        </Button>
      </form>
    </div>
  );
}

export default TopUpAgentAccount;
