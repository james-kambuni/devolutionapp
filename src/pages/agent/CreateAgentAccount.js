import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../Api';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { Button } from '@windmill/react-ui';

function CreateAgentAccount() {
  // Data & states
  const [formData, setFormData] = useState({
    BranchId: '',
    UserId: null,
    CurrencyCode: null
  });

  const history = useHistory();
  const [branches, setBranches] = useState([]);
  const [users, setUsers] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Methods
  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption ? selectedOption.value : null, // Use null instead of ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ServiceCode: 'CREATE_AGENT_ACCOUNT',
      ...formData,
    };

    try {
      let response = await api.create(payload);

      if (response.Response === '000') {
        setLoading(false);
        toast.success(response.ResponseDescription);
        setFormData({
          BranchId: '',
          UserId: null,
          CurrencyCode: null
        });
        history.push('/agent/top-up-agent-account');
      } else {
        setLoading(false);
        toast.error('Agent Account Registration Failure: ' + response.ResponseDescription);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Agent Account Registration Failure: ' + error);
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
          toast.error(response.ResponseDescription);
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };

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

    const getUsers = async () => {
        const payload = {
          ServiceCode: 'GET_VERIFIED_USERS',
        };
  
        try {
          let response = await api.create(payload);
          if (response.ResponseCode === '000') {
            setUsers(response.Users);  
          } else {
            toast.error('Error: Failure to get users');
          }
        } catch (error) {
          toast.error('Error: ' + error);
        }
      };

    getBranches();
    getCurrencies();
    getUsers();
  }, []);

  const branchOptions = branches.map((branch) => ({
    value: branch.BranchId,
    label: branch.BranchName,
  }));

  const currencyOptions = currencies.map((currency) => ({
    value: currency.CurrencyCode,
    label: currency.CurrencyName,
  }));

  const userOptions = users.map((user) => ({
    value: user.UserId,
    label: `${user.FirstName} ${user.MiddleName} ${user.LastName}`,
  }));

  return (
    <div className="flex flex-col py-8">
      <form
        className="w-full self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 rounded-md flex flex-col shadow-sm"
        onSubmit={handleSubmit}
      >
        <PageTitle>Create New Agent Account</PageTitle>

        <div className="mb-5">
          <label htmlFor="BranchId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select branch
          </label>
          <Select
            id="BranchId"
            name="BranchId"
            value={branchOptions.find((option) => option.value === formData.BranchId) || null} // Ensure controlled input
            onChange={handleSelectChange}
            options={branchOptions}
            placeholder="Select branch"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="UserId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select user
          </label>
          <Select
            id="UserId"
            name="UserId"
            value={userOptions.find((option) => option.value === formData.UserId) || null} // Ensure controlled input
            onChange={handleSelectChange}
            options={userOptions}
            placeholder="Select user"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="CurrencyCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Currency
          </label>
          <Select
            id="CurrencyCode"
            name="CurrencyCode"
            value={currencyOptions.find((option) => option.value === formData.CurrencyCode) || null} // Ensure controlled input
            onChange={handleSelectChange}
            options={currencyOptions}
            placeholder="Select Currency"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>

        <Button className="mt-4" block type="submit" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center">
              Loading...
            </span>
          ) : (
            "Create Agent Account"
          )}
        </Button>
      </form>
    </div>
  );
}

export default CreateAgentAccount;
