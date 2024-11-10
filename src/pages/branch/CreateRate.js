import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../Api';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';  
import { Button } from '@windmill/react-ui';

function CreateRate() {
  // Data & states
  const [formData, setFormData] = useState({
    CountryManagerId: '',
    BaseCurrency: '',
    CounterCurrency: '',
    ExchangeRate: '',
    BranchId: null,
  });

  const history = useHistory();
  const [managers, setManagers] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [branches, setBranches] = useState([]);
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
      ServiceCode: 'CREATE_UPDATE_RATE',
      ...formData,
    };

    try {
      let response = await api.create(payload);

      if (response.Response === '000') {
        setLoading(false);
        toast.success(response.ResponseDescription);
        setFormData({
          CountryManagerId: '',
          BaseCurrency: '',
          CounterCurrency: '',
          ExchangeRate: ''
        });
        history.push('/branch/list-branch-accounts');
      } else {
        setLoading(false);
        toast.error('Rate creation Failure: ' + response.ResponseDescription);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Rate creation Failure: ' + error);
    }
  };

  useEffect(() => {
    const getManagers = async () => {
      const payload = {
        ServiceCode: 'GET_ALL_CMS',
      };

      try {
        let response = await api.create(payload);
        if (response.ResponseCode === '000') {
          setManagers(response.CountryManagers);
        } else {
          toast.error('Error: Failure to get Country Managers');
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

    const getBranches = async (e) => {
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

    getManagers();
    getCurrencies();
    getBranches()
  }, []);


  const managerOptions = managers.map((manager) => ({
    value: manager.UserId,
    label: `${manager.FirstName} ${manager.MiddleName} ${manager.LastName}`,
  }));

  const currencyOptions = currencies.map((currency) => ({
    value: currency.CurrencyCode,
    label: currency.CurrencyName,
  }));

  const currencyOptions2 = currencies.map((currency) => ({
    value: currency.CurrencyCode,
    label: currency.CurrencyName,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const branchOption = branches.map((data) => ({
    value: data.BranchId,
    label: data.BranchName,
  }));

  const handleSelectChange12 = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      BranchId: selectedOption.value,
    }));
  };

  return (
    <div className="flex flex-col py-8">
      <form
        className="w-full self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 rounded-md flex flex-col shadow-sm"
        onSubmit={handleSubmit}
      >
        <PageTitle>Create new rate</PageTitle>

        <div className="mb-5">
          <label htmlFor="BranchId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Branch
          </label>
          <Select
            id="BranchId"
            name="BranchId"
            value={branchOption.find((option) => option.value === formData.BranchId) || ""}
            onChange={handleSelectChange12}
            options={branchOption}
            placeholder="Select branch"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />

        </div>

        <div className="mb-5">
          <label htmlFor="CountryManagerId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Country Manager
          </label>
          <Select
            id="CountryManagerId"
            name="CountryManagerId"
            value={managerOptions.find((option) => option.value === formData.CountryManagerId)}
            onChange={handleSelectChange}
            options={managerOptions}
            placeholder="Select country manager"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="BaseCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Base Currency
          </label>
          <Select
            id="BaseCurrency"
            name="BaseCurrency"
            value={currencyOptions.find((option) => option.value === formData.BaseCurrency)}
            onChange={handleSelectChange}
            options={currencyOptions}
            placeholder="Select Currency"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="CurrencyCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Counter Currency
          </label>
          <Select
            id="CounterCurrency"
            name="CounterCurrency"
            value={currencyOptions2.find((option) => option.value === formData.CounterCurrency)}
            onChange={handleSelectChange}
            options={currencyOptions2}
            placeholder="Select Currency"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="ExchangeRate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Exchange Rate
          </label>
          <input
            type="number"
            min="0"
            step="any"
            id="ExchangeRate"
            name="ExchangeRate"
            value={formData.ExchangeRate}
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
            "Create Rate"
          )}
        </Button>
      </form>
    </div>
  );
}

export default CreateRate;
