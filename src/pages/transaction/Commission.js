import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../Api';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';  

function Commission() {
  // Data & states
  const [formData, setFormData] = useState({
    SourceCountry: "",
    PayinCurrency: "",
    DestinationCountry: "",
    PayoutCurrency: "",
    DeliveryMethodCode: "",
    FeeIncludedWithAmount: "",
    Amount: "",

    FundsPurpose: '',
    ExchangeRate: '',
    PayinAmount: '',
    TotalToPay: '',
    PayoutAmount: '',
    TotalCommission: '',
    CommissionCurrency: '',
  });


  const history = useHistory();
  const [countries, setCountries] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [deliveryMethods, setDeliveryMethods] = useState([]);

  // Methods
  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ServiceCode: 'GET_COMMISSION',
      ...formData,
    };

    try {
      let response = await api.create(payload);

      if (response.Response === '000') {
        toast.success(response.ResponseDescription);
        setFormData({
            SourceCountry: "",
            PayinCurrency: "",
            DestinationCountry: "",
            PayoutCurrency: "",
            DeliveryMethodCode: "",
            FeeIncludedWithAmount: "",
            Amount: ""
        });
        history.push('/branch/list-branch-accounts');
      } else {
        toast.error('Rate creation Failure: ' + response.ResponseDescription);
      }
    } catch (error) {
      toast.error('Rate creation Failure: ' + error);
    }
  };

  useEffect(() => {
    const getCountries = async () => {
      const payload = {
        ServiceCode: 'GET_COUNTRIES',
      };

      try {
        let response = await api.create(payload);
        if (response.ResponseCode === '000') {
          setCountries(response.Countries);
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

    const getDeliveryMethods = async () => {
        const payload = {
          ServiceCode: 'GET_DELIVERY_METHOD',
          CountryCode: 'ET',
        };
        try {
          let response = await api.create(payload);
          if (response.ResponseCode === '000') {
            setDeliveryMethods(response.DeliveryMethods);
          } else {
            toast.error('Error: ' + response.ResponseCodeDescription);
          }
        } catch (error) {
          toast.error('Error: ' + error);
        }
      };


    getCountries();
    getCurrencies();
    getDeliveryMethods();
  }, []);


  const countryOptions = countries.map((country) => ({
    value: country.CountryCode,
    label: country.Country,
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

  const deliveryMethodOptions = deliveryMethods.map((data) => ({
    value: data.DeliveryMethodCode,
    label: data.Description,
  }));


  const handleGetTotalCommission = async (e) => {
    e.preventDefault();
    
    const {
      SourceCountry,
      PayinCurrency,
      DestinationCountry,
      DeliveryMethodCode,
      PayoutCurrency,
      FeeIncludedWithAmount,
      Amount
    } = formData;
  
    const payload = {
      ServiceCode: 'GET_COMMISSION',
      SourceCountry: SourceCountry,
      PayinCurrency: PayinCurrency,
      DestinationCountry: DestinationCountry,
      PayoutCurrency: PayoutCurrency,
      DeliveryMethodCode: DeliveryMethodCode || 'bank', 
      FeeIncludedWithAmount: FeeIncludedWithAmount,
      Amount: Amount,
    };
  
    try {
      const response = await api.create(payload);

      setFormData((prevData) => ({
        ...prevData,
        ...response,
        CommissionCurrency: response.TotalCommissionCurrency
      }));
      
    } catch (error) {
      toast.error(`Failure to get commission`);
    }
  };


  const handleSelectChange10 = (event) => {

    const { value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      FeeIncludedWithAmount: value, 
    }));

  };
  

  return (
    <div className="flex flex-col py-8 dark:text-gray-400">
      <form
        className="w-full self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 rounded-md flex flex-col shadow-sm"
        onSubmit={handleSubmit}
      >
        <PageTitle>Get Transaction Commission</PageTitle>

        <div className='flex flex-col md:flex-row items-center mb-5 gap-4'>
          <div className="flex-1">
            <label htmlFor="SourceCountry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Source Country
            </label>
            <Select
              id="SourceCountry"
              name="SourceCountry"
              value={countryOptions.find((option) => option.value === formData.SourceCountry)}
              onChange={handleSelectChange}
              options={countryOptions}
              placeholder="Select source country"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="DestinationCountry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Destination Country
            </label>
            <Select
              id="DestinationCountry"
              name="DestinationCountry"
              value={countryOptions.find((option) => option.value === formData.DestinationCountry)}
              onChange={handleSelectChange}
              options={countryOptions}
              placeholder="Select destination"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center mb-5 gap-4'>
          <div className="flex-1">
            <label htmlFor="PayinCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Paying Currency
            </label>
            <Select
              id="PayinCurrency"
              name="PayinCurrency"
              value={currencyOptions.find((option) => option.value === formData.PayinCurrency)}
              onChange={handleSelectChange}
              options={currencyOptions}
              placeholder="Select Paying Currency"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="PayoutCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Payout Currency
            </label>
            <Select
              id="PayoutCurrency"
              name="PayoutCurrency"
              value={currencyOptions2.find((option) => option.value === formData.PayoutCurrency)}
              onChange={handleSelectChange}
              options={currencyOptions2}
              placeholder="Select Payout Currency"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center mb-5 gap-4'>
          <div className="flex-1">
              <label htmlFor="DeliveryMethodCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select delivery method
              </label>

              <Select
                  id="DeliveryMethodCode"
                  name="DeliveryMethodCode"
                  value={deliveryMethodOptions.find((option) => option.value === formData.DeliveryMethodCode)}
                  onChange={handleSelectChange}
                  options={deliveryMethodOptions}
                  placeholder="Select delivery method"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
              />
          </div>


          <div className="flex-1">
            <label htmlFor="FeeIncludedWithAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Fee Included With Amount
            </label>
            <select
              id="FeeIncludedWithAmount"
              name="FeeIncludedWithAmount"
              value={formData.FeeIncludedWithAmount}
              onChange={handleSelectChange10}
              required
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            >
              <option value="">Select ...</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center mb-5 gap-4'>
          <div className="flex-1">
            <label htmlFor="Amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Amount
            </label>
            <input
              type="text"
              id="Amount"
              name="Amount"
              value={formData.Amount}
              onChange={handleChange}
              onKeyUp={(e)=>handleGetTotalCommission(e)}
              required
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center mb-5 gap-4'>
          <div className="flex-1">
            <label htmlFor="ExchangeRate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Exchange Rate
            </label>
            <input
              type="text"
              id="ExchangeRate"
              name="ExchangeRate"
              value={formData.ExchangeRate}
              onChange={handleChange}
              required
              disabled
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="TotalCommission" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Total Commission
            </label>
            <input
              type="text"
              id="TotalCommission"
              name="TotalCommission"
              value={formData.TotalCommission}
              onChange={handleChange}
              required
              disabled
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="CommissionCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Commission Currency
            </label>
            <input
              type="text"
              id="CommissionCurrency"
              name="CommissionCurrency"
              value={formData.CommissionCurrency}
              onChange={handleChange}
              required
              disabled
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center mb-5 gap-4'>
          <div className="flex-1">
            <label htmlFor="TotalToPay" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Total To Pay
            </label>
            <input
              type="text"
              id="TotalToPay"
              name="TotalToPay"
              value={formData.TotalToPay}
              onChange={handleChange}
              required
              disabled
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="PayoutAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Payout Amount
            </label>
            <input
              type="text"
              id="PayoutAmount"
              name="PayoutAmount"
              value={formData.PayoutAmount}
              onChange={handleChange}
              required
              disabled
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            />
          </div>
        </div>

      </form>
    </div>
  );
}

export default Commission;
