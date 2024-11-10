import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../Api';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';  
import { Button } from '@windmill/react-ui';

function CreateCompanyAccount() {
  // Data & states
  const [formData, setFormData] = useState({
    CurrencyCode: '',
    AccType: '',
    AccountNumber: ''
  });

  const history = useHistory();
  const [accountTypes, setAccountTypes] = useState([]);
  const [currencies, setCurrencies] = useState([]);
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
      ServiceCode: 'CREATE_COMPANY_ACC',
      ...formData,
    };

    try {
      let response = await api.create(payload);

      if (response.Response === '000') {
        setLoading(false);
        toast.success(response.ResponseDescription);
        setFormData({
            CurrencyCode: '',
            AccType: '',
            AccountNumber: ''
        });
        history.push('/company/list-company-accounts');
      } else {
        setLoading(false);
        toast.error('Company Account Registration Failure: ' + response.ResponseDescription);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Company Account Registration Failure: ' + error);
    }
  };

  useEffect(() => {
    const getAccountTypes = async () => {
      const payload = {
        ServiceCode: 'GET_ACCOUNT_TYPES',
      };

      try {
        let response = await api.create(payload);
        if (response.ResponseCode === '000') {
          setAccountTypes(response.AccountTypes);
        } else {
          toast.error('Error: Failure to get account types');
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

    getAccountTypes();
    getCurrencies();
  }, []);


  const accountTypeOptions = accountTypes.map((accountType) => ({
    value: accountType.AccType,
    label: accountType.AccType,
  }));

  const currencyOptions = currencies.map((currency) => ({
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

  return (
    <div className="flex flex-col py-8">
      <form
        className="w-full self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 rounded-md flex flex-col shadow-sm"
        onSubmit={handleSubmit}
      >
        <PageTitle>Create new company account</PageTitle>

        <div className="mb-5">
          <label htmlFor="AccType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select account type
          </label>
          <Select
            id="AccType"
            name="AccType"
            value={accountTypeOptions.find((option) => option.value === formData.AccType)}
            onChange={handleSelectChange}
            options={accountTypeOptions}
            placeholder="Select account type"
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
            value={currencyOptions.find((option) => option.value === formData.CurrencyCode)}
            onChange={handleSelectChange}
            options={currencyOptions}
            placeholder="Select Currency"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="AccountNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Account number
          </label>
          <input
            type="text"
            id="AccountNumber"
            name="AccountNumber"
            value={formData.AccountNumber}
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
            "Create Account Type"
          )}
        </Button>
      </form>
    </div>
  );
}

export default CreateCompanyAccount;
