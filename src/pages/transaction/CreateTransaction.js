import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../Api';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 
import { Button, Card, CardBody } from '@windmill/react-ui';
import './Transaction.css'

function CreateTransaction() {
  // Data & states
  const [formData, setFormData] = useState({
    DeliveryMethodCode: '',
    FulfillingBranch: '',
    SenderDetails: {
      SenderType: 'P',
      SenderName: '',
      SenderDob: '',
      SenderDocumentTypeId: '',
      SenderIdNumber: '',
      SenderCountry: '',
      SenderCity: '',
      SenderAddress: '',
      SenderMobile: '',
      SenderEmail: '',
      SenderOccupation: '',
    },
    ReceiverDetails: {
      ReceiverType: 'P',
      ReceiverName: '',
      ReceiverDob: '',
      ReceiverDocumentTypeId: '',
      ReceiverIdNumber: '',
      ReceiverCountry: '',
      ReceiverCity: '',
      ReceiverAddress: '',
      ReceiverMobile: '',
      ReceiverEmail: '',
      ReceiverOccupation: '',
    },
    BankDetails: {
      BankName: '',
      AccountName: '',
      AccountNumber: '',
      BankCode: '',
      SwiftCode: '',
    },
    TransactionDetails: {
      FundsPurpose: '',
      FeeIncludedWithAmount: '',
      ExchangeRate: '',
      PayinAmount: '',
      PayinCurrency: '',
      TotalToPay: '',
      PayoutAmount: '',
      PayoutCurrency: '',
      TotalCommission: '',
      CommissionCurrency: '',
    }
  });

  const [countries, setCountries] = useState([]);
  const [formData2, setFormData2] = useState({
      CountryCode: 'ET'
  });
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(1);
  const [currencies, setCurrencies] = useState([]);
  const [errors, setErrors] = useState({});
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);


  const [formData3, setFormData3] = useState({
    PhoneNumber: '',
  });

  // Fetch countries
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

    const getCountries = async () => {
      const payload = { ServiceCode: 'GET_COUNTRIES' };
      try {
        let response = await api.create(payload);
        if (response.ResponseCode === '000') {
          setCountries(response.Countries);
        } else {
          toast.error('Error: Failure to get countries');
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };


    const getBranches = async () => {
      const payload = { ServiceCode: 'GET_BRANCHES' };
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

    getCurrencies();
    getCountries();
    getBranches();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ServiceCode: 'SENDMONEY',
      ...formData,
    };
    try {
      let response = await api.create(payload);
      if (response.Response === '000') {
        setLoading(false);
        toast.success(response.ResponseDescription);
        document.getElementById("popup-modal").classList.add("hidden")
        history.push('/transaction/show-transaction/'+response.TransactionNumber);
      } else {
        setLoading(false);
        document.getElementById("popup-modal").classList.add("hidden")
        toast.error(response.ResponseDescription);
      }
    } catch (error) {
      setLoading(false);
      document.getElementById("popup-modal").classList.add("hidden")
      toast.error('Transaction Failure: ' + error);
    }
  };

  // Handle form change for nested objects
  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');

    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };


  const countryOptions = countries.map((country) => ({
    value: country.CountryCode,
    label: country.Country,
  }));

  const branchOptions = branches.map((data) => ({
    value: data.BranchId,
    label: data.BranchName,
  }));

  const handleSelectChange = (selectedOption) => {
    setFormData2((prevData) => ({
      ...prevData,
      CountryCode: selectedOption.value,
    }));
  };

  const handleSelectChange12 = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      FulfillingBranch: selectedOption.value,
    }));
  };

  const handleSelectChange4 = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      DeliveryMethodCode: selectedOption.value,
    }));
  };

  const handleSelectChange2 = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      SenderDetails: {
        ...prevData.SenderDetails,
        SenderCountry: selectedOption.value, 
      },
    }));
  };

  const handleSelectChange3 = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      ReceiverDetails: {
        ...prevData.ReceiverDetails,
        ReceiverCountry: selectedOption.value, 
      },
    }));
  };

  useEffect(() => {
    const getData = async () => {
      const payload = {
        ServiceCode: 'GET_DELIVERY_METHOD',
        CountryCode: formData2.CountryCode,
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
    getData();
  }, [formData2.CountryCode]);

  const deliveryMethodOptions = deliveryMethods.map((data) => ({
    value: data.DeliveryMethodCode,
    label: data.Description,
  }));



  const handleGetTotalCommission = async (e) => {
    e.preventDefault();
    
    const {
      SenderDetails: { SenderCountry },
      ReceiverDetails: { ReceiverCountry },
      TransactionDetails: { PayinCurrency, PayinAmount, PayoutCurrency, FeeIncludedWithAmount },
      DeliveryMethodCode
    } = formData;
  
    const payload = {
      ServiceCode: 'GET_COMMISSION',
      SourceCountry: SenderCountry,
      PayinCurrency: PayinCurrency,
      DestinationCountry: ReceiverCountry,
      PayoutCurrency: PayoutCurrency,
      DeliveryMethodCode: DeliveryMethodCode || 'bank', 
      FeeIncludedWithAmount: FeeIncludedWithAmount,
      Amount: PayinAmount,
    };
  
    try {
      const response = await api.create(payload);

      setFormData((prevData) => ({
        ...prevData,
        TransactionDetails: {
          ...prevData.TransactionDetails,
          ...response,
          CommissionCurrency: response.TotalCommissionCurrency
        },
      }));
      
    } catch (error) {
      toast.error(`Failure to get commission`);
    }
  };


  const currencyOptions = currencies.map((currency) => ({
    value: currency.CurrencyCode,
    label: currency.CurrencyName,
  }));

  const currencyOptions2 = currencies.map((currency) => ({
    value: currency.CurrencyCode,
    label: currency.CurrencyName,
  }));

  const handleSelectChange6 = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      TransactionDetails: {
        ...prevData.TransactionDetails,
        PayinCurrency: selectedOption.value, 
      },
    }));
  };

  const handleSelectChange7 = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      TransactionDetails: {
        ...prevData.TransactionDetails,
        PayoutCurrency: selectedOption.value, 
      },
    }));
  };


  const handleSelectChange8 = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      SenderDetails: {
        ...prevData.SenderDetails,
        SenderDocumentTypeId: value,
      },
    }));
  };

  const handleSelectChange9 = (event) => {

    const { value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      ReceiverDetails: {
        ...prevData.ReceiverDetails,
        ReceiverDocumentTypeId: value, 
      },
    }));
  };

  const handleSelectChange10 = (event) => {

    const { value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      TransactionDetails: {
        ...prevData.TransactionDetails,
        FeeIncludedWithAmount: value, 
      },
    }));

  };


  const handleSelectChange18 = (event) => {
    const { value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      SenderDetails: {
        ...prevData.SenderDetails,
        SenderType: value, 
      },
    }));

  }

  const handleSelectChange19 = (event) => {
    const { value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      ReceiverDetails: {
        ...prevData.ReceiverDetails,
        ReceiverType: value, 
      },
    }));

  }

  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      SenderDetails: {
        ...prevData.SenderDetails,
        SenderMobile: value,
      },
    }));
  };

  const handlePhoneChange2 = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      ReceiverDetails: {
        ...prevData.ReceiverDetails,
        ReceiverMobile: value,
      },
    }));
  };

  const handlePhoneChange3 = (value) => {
    setFormData3((prevData) => ({
      ...prevData,
      PhoneNumber: value,
    }));
  };


    const GetSender = async (e) => {
      e.preventDefault()

      const payload = {
        ServiceCode: 'GET_SENDER_BY_PHONENUMBER',
        ...formData3
      };
      try {
        let response = await api.create(payload);
        if (response.ResponseCode === '000') {

          if(response.List.length <= 0){
            toast.error('No such available sender!');
          }

          setFormData((prevData) => ({
            ...prevData,
            SenderDetails: {
              SenderType: response?.List?.SenderType,
              SenderName: response?.List?.SenderName,
              SenderDob: response?.List?.SenderDob,
              SenderDocumentTypeId: response?.List?.SenderDocumentTypeId,
              SenderIdNumber: response?.List?.SenderIdNumber,
              SenderCountry: response?.List?.SenderCountry,
              SenderCity: response?.List?.SenderCity,
              SenderAddress: response?.List?.SenderAddress,
              SenderMobile: response?.List?.SenderMobile,
              SenderEmail: response?.List?.SenderEmail,
              SenderOccupation: response?.List?.SenderOccupation
            }
          }))

          setFormData3({
            PhoneNumber: '',
          })
        } else {
          toast.error('Error: ' + response.ResponseCodeDescription);
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };


    const GetReceiver = async (e) => {
      e.preventDefault()

      const payload = {
        ServiceCode: 'FETCH_RECEIVER_ARRAY',
        ...formData3
      };
      try {
        let response = await api.create(payload);
        if (response.ResponseCode === '000') {

          if(response.List.length <= 0) {
            toast.error('No such available receiver!');
          }

          setFormData((prevData) => ({
            ...prevData,
            ReceiverDetails: {
              ReceiverType: response?.List?.ReceiverType,
              ReceiverName: response?.List?.ReceiverName,
              ReceiverDob: response?.List?.ReceiverDob,
              ReceiverDocumentTypeId: response?.List?.ReceiverDocumentTypeId,
              ReceiverIdNumber: response?.List?.ReceiverIdNumber,
              ReceiverCountry: response?.List?.ReceiverCountry,
              ReceiverCity: response?.List?.ReceiverCity,
              ReceiverAddress: response?.List?.ReceiverAddress,
              ReceiverMobile: response?.List?.ReceiverMobile,
              ReceiverEmail: response?.List?.ReceiverEmail,
              ReceiverOccupation: response?.List?.ReceiverOccupation
            }
          }))

          setFormData3({
            PhoneNumber: '',
          })
        } else {
          toast.error('Error: ' + response.ResponseCodeDescription);
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };

    const isBankDetailsEmpty = (details) => {
      return Object.values(details).every(value => value === '');
    };

  return (
    <div className="flex flex-col py-8 relative">

    <ol className="flex items-center oler p-3 space-x-2 text-sm font-medium text-center text-gray-500 border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse mb-4">
        {/* Step 1 */}
        <li className={`flex gap-2 items-center ${currentStep >= 1 ? 'text-blue-600 dark:text-blue-500' : ''}`}>
            <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${currentStep >= 1 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'}`}>
            1
            </span>
            Delivery <span className="hidden sm:inline-flex sm:ms-2">Method</span>
            {currentStep > 1 && (
            <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 9 4-4-4-4M1 9l4-4-4-4" />
            </svg>
            )}
        </li>

        {/* Step 2 */}
        <li className={`flex gap-2 items-center ${currentStep >= 2 ? 'text-blue-600 dark:text-blue-500' : ''}`}>
            <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${currentStep >= 2 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'}`}>
            2
            </span>
            Sender <span className="hidden sm:inline-flex sm:ms-2">Details</span>
            {currentStep > 2 && (
            <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 9 4-4-4-4M1 9l4-4-4-4" />
            </svg>
            )}
        </li>

        {/* Step 3 */}
        <li className={`flex gap-2 items-center ${currentStep >= 3 ? 'text-blue-600 dark:text-blue-500' : ''}`}>
            <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${currentStep >= 3 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'}`}>
            3
            </span>
            Receiver <span className="hidden sm:inline-flex sm:ms-2">Details</span>
            {currentStep > 3 && (
            <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 9 4-4-4-4M1 9l4-4-4-4" />
            </svg>
            )}
        </li>

        {/* Step 4 */}
        {formData.DeliveryMethodCode === 'bank' && 
        <li className={`flex gap-2 items-center ${currentStep >= 4 ? 'text-blue-600 dark:text-blue-500' : ''}`}>
            <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${currentStep >= 4 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'}`}>
            4
            </span>
            Bank <span className="hidden sm:inline-flex sm:ms-2">Details</span>
            {currentStep > 4 && (
            <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 9 4-4-4-4M1 9l4-4-4-4" />
            </svg>
            )}
        </li>}
              
        {/* Step 5 */}
        <li className={`flex gap-2 items-center ${currentStep >= 5 ? 'text-blue-600 dark:text-blue-500' : ''}`}>
          {formData.DeliveryMethodCode === 'bank' ? 
            <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${currentStep >= 5 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'}`}>
            5
            </span>
          :
            <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${currentStep >= 5 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'}`}>
            4
            </span>
          }
            Transaction <span className="hidden sm:inline-flex sm:ms-2">Details</span>
        </li>
    </ol>


    <form
      className="w-full self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 rounded-md flex flex-col shadow-sm"
      onSubmit={handleSubmit}
    >

    {currentStep === 1 &&
    <>
      <PageTitle>Add Delivery Method</PageTitle>

      <div className="mb-5">
        <label htmlFor="SenderName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select country
        </label>

        <Select
            id="CountryCode"
            name="CountryCode"
            value={countryOptions.find((option) => option.value === formData2.CountryCode)}
            onChange={handleSelectChange}
            options={countryOptions}
            placeholder="Select Country"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
        />
        {errors.CountryCode && <p className="text-red-500 text-sm mt-1">{errors.CountryCode}</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="FulfillingBranch" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select Full Filling Branch 
        </label>

        <Select
            id="FulfillingBranch"
            name="FulfillingBranch"
            value={branchOptions.find((option) => option.value === formData.FulfillingBranch)}
            onChange={handleSelectChange12}
            options={branchOptions}
            placeholder="Select Branch"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
        />
        {errors.FulfillingBranch && <p className="text-red-500 text-sm mt-1">{errors.FulfillingBranch}</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="DeliveryMethodCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select delivery method
        </label>

        <Select
            id="DeliveryMethodCode"
            name="DeliveryMethodCode"
            value={deliveryMethodOptions.find((option) => option.value === formData.DeliveryMethodCode)}
            onChange={handleSelectChange4}
            options={deliveryMethodOptions}
            placeholder="Select delivery method"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
        />
        {errors.DeliveryMethodCode && <p className="text-red-500 text-sm mt-1">{errors.DeliveryMethodCode}</p>}
      </div>

      <div className='flex flex-end'>
        <button 
        className='ml-auto border p-2 rounded-md'
        type='button'
        onClick={(e)=>{
            e.preventDefault()
            const newErrors = {};

            if (!formData2.CountryCode) {
              newErrors.CountryCode = 'Please select a country.';
            }

            if (!formData.DeliveryMethodCode) {
              newErrors.DeliveryMethodCode = 'Please select a delivery method.';
            }

            if (!formData.FulfillingBranch) {
              newErrors.FulfillingBranch = 'Please select a Full Filling  Branch.';
            }

            if (Object.keys(newErrors).length > 0) {
              setErrors(newErrors);
            } else {
              setCurrentStep(2);
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }
        }}
        >Next</button>
      </div>
    </>}
      {/* Sender Details */}

      {currentStep === 2 && 
      <>
        <PageTitle>Search or Create Sender</PageTitle>
        <Card className="mb-8">
          <CardBody>
            <div className="mb-5">
              <label htmlFor="formData3.PhoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <PageTitle>Search sender</PageTitle>
              </label>
              <PhoneInput
                country={'gb'} 
                value={formData3.PhoneNumber}
                onChange={handlePhoneChange3}
                inputProps={{
                  name: 'PhoneNumber',
                  required: true,
                }}
                className="shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full flex flex-1"
              />
            </div>
            <button onClick={(e)=>GetSender(e)} className='w-full bg-blue-500 text-white p-2 rounded-md'>Search Sender</button>
          </CardBody>
        </Card>

        <div className="mb-5">
            <label htmlFor="SenderDetails.SenderName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Sender Name
            </label>
            <input
            type="text"
            id="SenderDetails.SenderName"
            name="SenderDetails.SenderName"
            value={formData.SenderDetails.SenderName}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            />
            {errors.SenderName && <p className="text-red-500 text-sm mt-1">{errors.SenderName}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="SenderDetails.SenderType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Sender Type
          </label>
          <select
            id="SenderDetails.SenderType"
            name="SenderDetails.SenderType"
            value={formData.SenderDetails.SenderType}
            onChange={handleSelectChange18}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          >
            <option value="">Select ...</option>
            <option value="P">Personal</option>
            <option value="B">Business</option>
          </select>
          {errors.SenderType && <p className="text-red-500 text-sm mt-1">{errors.SenderType}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="SenderDetails.SenderEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Sender Email
          </label>
          <input
            type="email"
            id="SenderDetails.SenderEmail"
            name="SenderDetails.SenderEmail"
            value={formData.SenderDetails.SenderEmail}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
          {errors.SenderEmail && <p className="text-red-500 text-sm mt-1">{errors.SenderEmail}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="SenderDetails.SenderDob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Sender Date of birth
          </label>
          <input
            type="date"
            id="SenderDetails.SenderDob"
            name="SenderDetails.SenderDob"
            value={formData.SenderDetails.SenderDob}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
          {errors.SenderDob && <p className="text-red-500 text-sm mt-1">{errors.SenderDob}</p>}
        </div>


        <div className="mb-5">
          <label htmlFor="SenderDetails.SenderMobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Sender Mobile Number
          </label>
          <PhoneInput
            country={'gb'} 
            value={formData.SenderDetails.SenderMobile}
            onChange={handlePhoneChange}
            inputProps={{
              name: 'PhoneNumber',
              required: true,
            }}
            className="shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full flex flex-1"
          />
          {errors.SenderMobile && <p className="text-red-500 text-sm mt-1">{errors.SenderMobile}</p>}
        </div>

        <div className='flex flex-col md:flex-row items-center mb-5 gap-4'>
          <div className="flex-1">
            <label htmlFor="SenderDetails.SenderDocumentTypeId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sender Document Type
            </label>
            <select
              id="SenderDetails.SenderDocumentTypeId"
              name="SenderDetails.SenderDocumentTypeId"
              value={formData.SenderDetails.SenderDocumentTypeId}
              onChange={handleSelectChange8}
              required
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            >
              <option value="">Select ...</option>
              <option value="National_ID">National ID</option>
              <option value="Passport">Passport</option>
              <option value="Driving_License">Driving License</option>
            </select>
            {errors.SenderDocumentTypeId && <p className="text-red-500 text-sm mt-1">{errors.SenderDocumentTypeId}</p>}
          </div>

          <div className="flex-1">
            <label htmlFor="SenderDetails.SenderIdNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sender ID Number
            </label>
            <input
              type="text"
              id="SenderDetails.SenderIdNumber"
              name="SenderDetails.SenderIdNumber"
              value={formData.SenderDetails.SenderIdNumber}
              onChange={handleChange}
              required
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            />
            {errors.SenderIdNumber && <p className="text-red-500 text-sm mt-1">{errors.SenderIdNumber}</p>}
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center mb-5 gap-4'>
          <div className="flex-1">
              <label htmlFor="SenderDetails.SenderCountry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select sender's country
              </label>

              <Select
                  id="SenderDetails.SenderCountry"
                  name="SenderDetails.SenderCountry"
                  value={countryOptions.find((option) => option.value === formData.SenderDetails.SenderCountry)}
                  onChange={handleSelectChange2}
                  options={countryOptions}
                  placeholder="Select Country"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
              />

            {errors.SenderCountry && <p className="text-red-500 text-sm mt-1">{errors.SenderCountry}</p>}
          </div>


          <div className="flex-1">
            <label htmlFor="SenderDetails.SenderCity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sender City
            </label>
            <input
              type="text"
              id="SenderDetails.SenderCity"
              name="SenderDetails.SenderCity"
              value={formData.SenderDetails.SenderCity}
              onChange={handleChange}
              required
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            />
            {errors.SenderCity && <p className="text-red-500 text-sm mt-1">{errors.SenderCity}</p>}
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="SenderDetails.SenderAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Sender Address
          </label>
          <input
            type="text"
            id="SenderDetails.SenderAddress"
            name="SenderDetails.SenderAddress"
            value={formData.SenderDetails.SenderAddress}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
          {errors.SenderAddress && <p className="text-red-500 text-sm mt-1">{errors.SenderAddress}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="SenderDetails.SenderOccupation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Sender Occupation
          </label>
          <input
            type="text"
            id="SenderDetails.SenderOccupation"
            name="SenderDetails.SenderOccupation"
            value={formData.SenderDetails.SenderOccupation}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
          {errors.SenderOccupation && <p className="text-red-500 text-sm mt-1">{errors.SenderOccupation}</p>}
        </div>

        <div className='flex flex-row gap-20 flex-end'>
            <button 
            className='mr-auto border p-2 rounded-md'
            onClick={()=>{
                setCurrentStep(1)
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            }}
            >Previous</button>

            <button 
            className='ml-auto border p-2 rounded-md'
            onClick={(e)=>{

              e.preventDefault()
              const newErrors = {};

              if (!formData.SenderDetails.SenderName) {
                newErrors.SenderName = 'Please add sender name.';
              }

              if (!formData.SenderDetails.SenderEmail) {
                newErrors.SenderEmail = 'Please add sender email.';
              }

              if (!formData.SenderDetails.SenderDob) {
                newErrors.SenderDob = 'Please add sender date of birth.';
              }

              if (!formData.SenderDetails.SenderMobile) {
                newErrors.SenderMobile = 'Please add sender mobile number.';
              }

              if (!formData.SenderDetails.SenderDocumentTypeId) {
                newErrors.SenderDocumentTypeId = 'Please add sender document type.';
              }

              if (!formData.SenderDetails.SenderIdNumber) {
                newErrors.SenderIdNumber = 'Please add sender ID number.';
              }

              if (!formData.SenderDetails.SenderCountry) {
                newErrors.SenderCountry = 'Please add sender country.';
              }

              if (!formData.SenderDetails.SenderCity) {
                newErrors.SenderCity = 'Please add sender city.';
              }

              if (!formData.SenderDetails.SenderAddress) {
                newErrors.SenderAddress = 'Please add sender address.';
              }

              if (!formData.SenderDetails.SenderOccupation) {
                newErrors.SenderOccupation = 'Please add sender occupation.';
              }

              if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
              } else {
                setCurrentStep(3);
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              }
            }}
            >Next</button>
        </div>
      </>}

    {/* Receiver Details */}

    {currentStep === 3 &&
    <>
        <PageTitle>Search or Create Receiver</PageTitle>
        <Card className="mb-8">
          <CardBody>
            <div className="mb-5">
              <label htmlFor="formData3.PhoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <PageTitle>Search receiver</PageTitle>
              </label>
              <PhoneInput
                country={'gb'} 
                value={formData3.PhoneNumber}
                onChange={handlePhoneChange3}
                inputProps={{
                  name: 'PhoneNumber',
                  required: true,
                }}
                className="shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full flex flex-1"
              />
            </div>

            <button onClick={(e)=>GetReceiver(e)} className='w-full bg-blue-500 text-white p-2 rounded-md'>Search receiver</button>
          </CardBody>
        </Card>

        <div className="mb-5">
            <label htmlFor="ReceiverDetails.ReceiverName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Receiver Name
            </label>
            <input
            type="text"
            id="ReceiverDetails.ReceiverName"
            name="ReceiverDetails.ReceiverName"
            value={formData.ReceiverDetails.ReceiverName}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            />
            {errors.ReceiverName && <p className="text-red-500 text-sm mt-1">{errors.ReceiverName}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="ReceiverDetails.ReceiverType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Receiver Type
          </label>
          <select
            id="ReceiverDetails.ReceiverType"
            name="ReceiverDetails.ReceiverType"
            value={formData.ReceiverDetails.ReceiverType}
            onChange={handleSelectChange19}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          >
            <option value="">Select ...</option>
            <option value="P">Personal</option>
            <option value="B">Business</option>
          </select>
          {errors.ReceiverType && <p className="text-red-500 text-sm mt-1">{errors.ReceiverType}</p>}
        </div>


        <div className="mb-5">
          <label htmlFor="ReceiverDetails.ReceiverEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Receiver Email
          </label>
          <input
            type="email"
            id="ReceiverDetails.ReceiverEmail"
            name="ReceiverDetails.ReceiverEmail"
            value={formData.ReceiverDetails.ReceiverEmail}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
          {errors.ReceiverEmail && <p className="text-red-500 text-sm mt-1">{errors.ReceiverEmail}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="ReceiverDetails.ReceiverDob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Receiver Date of birth
          </label>
          <input
            type="date"
            id="ReceiverDetails.ReceiverDob"
            name="ReceiverDetails.ReceiverDob"
            value={formData.ReceiverDetails.ReceiverDob}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
          {errors.ReceiverDob && <p className="text-red-500 text-sm mt-1">{errors.ReceiverDob}</p>}
        </div>


        <div className="mb-5">
          <label htmlFor="ReceiverDetails.ReceiverMobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Receiver Mobile Number
          </label>
          <PhoneInput
            country={'gb'} 
            value={formData.ReceiverDetails.ReceiverMobile}
            onChange={handlePhoneChange2}
            inputProps={{
              name: 'PhoneNumber',
              required: true,
            }}
            className="shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full flex flex-1"
          />
          {errors.ReceiverMobile && <p className="text-red-500 text-sm mt-1">{errors.ReceiverMobile}</p>}
        </div>

        <div className='flex flex-col md:flex-row items-center mb-5 gap-4'>
          <div className="flex-1">
            <label htmlFor="ReceiverDetails.ReceiverDocumentTypeId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Receiver Document Type
            </label>
            <select
              id="ReceiverDetails.ReceiverDocumentTypeId"
              name="ReceiverDetails.ReceiverDocumentTypeId"
              value={formData.ReceiverDetails.ReceiverDocumentTypeId}
              onChange={handleSelectChange9}
              required
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            >
              <option value="">Select ...</option>
              <option value="National_ID">National ID</option>
              <option value="Passport">Passport</option>
              <option value="Driving_License">Driving License</option>
            </select>
            {errors.ReceiverDocumentTypeId && <p className="text-red-500 text-sm mt-1">{errors.ReceiverDocumentTypeId}</p>}
          </div>

          <div className="flex-1">
            <label htmlFor="ReceiverDetails.ReceiverIdNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Receiver ID Number
            </label>
            <input
              type="text"
              id="ReceiverDetails.ReceiverIdNumber"
              name="ReceiverDetails.ReceiverIdNumber"
              value={formData.ReceiverDetails.ReceiverIdNumber}
              onChange={handleChange}
              required
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            />
            {errors.ReceiverIdNumber && <p className="text-red-500 text-sm mt-1">{errors.ReceiverIdNumber}</p>}
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center mb-5 gap-4'>
          <div className="flex-1">
              <label htmlFor="ReceiverDetails.ReceiverCountry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Receiver's country
              </label>

              <Select
                  id="ReceiverDetails.ReceiverCountry"
                  name="ReceiverDetails.ReceiverCountry"
                  value={countryOptions.find((option) => option.value === formData.ReceiverDetails.ReceiverCountry)}
                  onChange={handleSelectChange3}
                  options={countryOptions}
                  placeholder="Select Country"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
              />
              {errors.ReceiverCountry && <p className="text-red-500 text-sm mt-1">{errors.ReceiverCountry}</p>}
          </div>


          <div className="flex-1">
            <label htmlFor="ReceiverDetails.SenderCity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Receiver City
            </label>
            <input
              type="text"
              id="ReceiverDetails.ReceiverCity"
              name="ReceiverDetails.ReceiverCity"
              value={formData.ReceiverDetails.ReceiverCity}
              onChange={handleChange}
              required
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
            />
            {errors.ReceiverCity && <p className="text-red-500 text-sm mt-1">{errors.ReceiverCity}</p>}
          </div>
        </div>


        <div className="mb-5">
          <label htmlFor="ReceiverDetails.ReceiverAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Receiver Address
          </label>
          <input
            type="text"
            id="ReceiverDetails.ReceiverAddress"
            name="ReceiverDetails.ReceiverAddress"
            value={formData.ReceiverDetails.ReceiverAddress}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
          {errors.ReceiverAddress && <p className="text-red-500 text-sm mt-1">{errors.ReceiverAddress}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="ReceiverDetails.ReceiverOccupation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Receiver Occupation
          </label>
          <input
            type="text"
            id="ReceiverDetails.ReceiverOccupation"
            name="ReceiverDetails.ReceiverOccupation"
            value={formData.ReceiverDetails.ReceiverOccupation}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
          {errors.ReceiverOccupation && <p className="text-red-500 text-sm mt-1">{errors.ReceiverOccupation}</p>}
        </div>

        <div className='flex flex-row gap-20 flex-end'>
            <button 
            className='mr-auto border p-2 rounded-md'
            onClick={()=>{
                setCurrentStep(2)
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            }}
            >Previous</button>

            <button 
            className='ml-auto border p-2 rounded-md'
            onClick={(e)=>{
                e.preventDefault()
                const newErrors = {};
  
                if (!formData.ReceiverDetails.ReceiverName) {
                  newErrors.ReceiverName = 'Please add receiver name.';
                }
  
                if (!formData.ReceiverDetails.ReceiverEmail) {
                  newErrors.ReceiverEmail = 'Please add receiver email.';
                }
  
                if (!formData.ReceiverDetails.ReceiverDob) {
                  newErrors.ReceiverDob = 'Please add receiver date of birth.';
                }
  
                if (!formData.ReceiverDetails.ReceiverMobile) {
                  newErrors.ReceiverMobile = 'Please add receiver mobile number.';
                }
  
                if (!formData.ReceiverDetails.ReceiverDocumentTypeId) {
                  newErrors.ReceiverDocumentTypeId = 'Please add receiver document type.';
                }
  
                if (!formData.ReceiverDetails.ReceiverIdNumber) {
                  newErrors.ReceiverIdNumber = 'Please add receiver ID number.';
                }
  
                if (!formData.ReceiverDetails.ReceiverCountry) {
                  newErrors.ReceiverCountry = 'Please add receiver country.';
                }
  
                if (!formData.ReceiverDetails.ReceiverCity) {
                  newErrors.ReceiverCity = 'Please add receiver city.';
                }
  
                if (!formData.ReceiverDetails.ReceiverAddress) {
                  newErrors.ReceiverAddress = 'Please add receiver address.';
                }
  
                if (!formData.ReceiverDetails.ReceiverOccupation) {
                  newErrors.ReceiverOccupation = 'Please add receiver occupation.';
                }
  
                if (Object.keys(newErrors).length > 0) {
                  setErrors(newErrors);
                } else {
                  if(formData.DeliveryMethodCode !== 'bank') {
                    setCurrentStep(5);
                  }else {
                    setCurrentStep(4);
                  }

                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }
            }}
            >Next</button>
        </div>

    </>}
    {/* BankDetails Details */}

    {currentStep === 4 && 
    <>
        <PageTitle>Add Bank Details</PageTitle>

        <div className="mb-5">
          <label htmlFor="BankDetails.BankName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Bank name
          </label>
          <input
            type="text"
            id="BankDetails.BankName"
            name="BankDetails.BankName"
            value={formData.BankDetails.BankName}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
          {errors.BankName && <p className="text-red-500 text-sm mt-1">{errors.BankName}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="BankDetails.AccountName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Account Name
          </label>
          <input
            type="text"
            id="BankDetails.AccountName"
            name="BankDetails.AccountName"
            value={formData.BankDetails.AccountName}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
          {errors.AccountName && <p className="text-red-500 text-sm mt-1">{errors.AccountName}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="BankDetails.AccountNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Account Number
          </label>
          <input
            type="text"
            id="BankDetails.AccountNumber"
            name="BankDetails.AccountNumber"
            value={formData.BankDetails.AccountNumber}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
          {errors.AccountNumber && <p className="text-red-500 text-sm mt-1">{errors.AccountNumber}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="BankDetails.BankCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Bank Code
          </label>
          <input
            type="text"
            id="BankDetails.BankCode"
            name="BankDetails.BankCode"
            value={formData.BankDetails.BankCode}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
          {errors.BankCode && <p className="text-red-500 text-sm mt-1">{errors.BankCode}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="BankDetails.SwiftCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Swift Code
          </label>
          <input
            type="text"
            id="BankDetails.SwiftCode"
            name="BankDetails.SwiftCode"
            value={formData.BankDetails.SwiftCode}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
          {errors.SwiftCode && <p className="text-red-500 text-sm mt-1">{errors.SwiftCode}</p>}
        </div>
        <div className='flex flex-row gap-20 flex-end'>
            <button 
            className='mr-auto border p-2 rounded-md'
            onClick={()=>{
                setCurrentStep(3)
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            }}
            >Previous</button>

            <button 
            className='ml-auto border p-2 rounded-md'
            onClick={(e)=>{
              e.preventDefault()
              const newErrors = {};

              if (!formData.BankDetails.BankName) {
                newErrors.BankName = 'Please add bank name.';
              }

              if (!formData.BankDetails.AccountName) {
                newErrors.AccountName = 'Please add account name.';
              }

              if (!formData.BankDetails.AccountNumber) {
                newErrors.AccountNumber = 'Please add account number.';
              }

              if (!formData.BankDetails.BankCode) {
                newErrors.BankCode = 'Please add bank code.';
              }

              if (!formData.BankDetails.SwiftCode) {
                newErrors.SwiftCode = 'Please add swift code.';
              }

              if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
              } else {
                setCurrentStep(5);
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              }
            }}
            >Next</button>
        </div>
    </>}
    {/* TransactionDetails Details */}

    {currentStep === 5 &&
    <>
        <PageTitle>Add Transaction Details</PageTitle>

        <div className='flex flex-col md:flex-row gap-2 mb-5'>
          <div className="flex-1">
            <label htmlFor="TransactionDetails.PayinCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Paying Currency
            </label>
            <Select
              id="TransactionDetails.PayinCurrency"
              name="TransactionDetails.PayinCurrency"
              value={currencyOptions.find((option) => option.value === formData.TransactionDetails.PayinCurrency)}
              onChange={handleSelectChange6}
              options={currencyOptions}
              placeholder="Select Currency"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="TransactionDetails.PayoutCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Payout Currency
            </label>

            <Select
              id="TransactionDetails.PayoutCurrency"
              name="TransactionDetails.PayoutCurrency"
              value={currencyOptions2.find((option) => option.value === formData.TransactionDetails.PayoutCurrency)}
              onChange={handleSelectChange7}
              options={currencyOptions2}
              placeholder="Select Currency"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="TransactionDetails.FeeIncludedWithAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Fee Included With Amount
          </label>
          <select
            id="TransactionDetails.FeeIncludedWithAmount"
            name="TransactionDetails.FeeIncludedWithAmount"
            value={formData.TransactionDetails.FeeIncludedWithAmount}
            onChange={handleSelectChange10}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          >
            <option value="">Select ...</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="TransactionDetails.PayinAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Paying Amount
          </label>
          <input
            type="text"
            id="TransactionDetails.PayinAmount"
            name="TransactionDetails.PayinAmount"
            value={formData.TransactionDetails.PayinAmount}
            onChange={handleChange}
            onKeyUp={(e)=>handleGetTotalCommission(e)}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>


        <div className="mb-5">
          <label htmlFor="TransactionDetails.ExchangeRate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Exchange Rate
          </label>
          <input
            type="text"
            id="TransactionDetails.ExchangeRate"
            name="TransactionDetails.ExchangeRate"
            value={formData.TransactionDetails.ExchangeRate}
            onChange={handleChange}
            required
            disabled
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="TransactionDetails.TotalToPay" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Total To Pay
          </label>
          <input
            type="text"
            id="TransactionDetails.TotalToPay"
            name="TransactionDetails.TotalToPay"
            value={formData.TransactionDetails.TotalToPay}
            onChange={handleChange}
            required
            disabled
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="TransactionDetails.PayoutAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Payout Amount
          </label>
          <input
            type="text"
            id="TransactionDetails.PayoutAmount"
            name="TransactionDetails.PayoutAmount"
            value={formData.TransactionDetails.PayoutAmount}
            onChange={handleChange}
            required
            disabled
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="TransactionDetails.TotalCommission" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Total Commission
          </label>
          <input
            type="text"
            id="TransactionDetails.TotalCommission"
            name="TransactionDetails.TotalCommission"
            value={formData.TransactionDetails.TotalCommission}
            onChange={handleChange}
            required
            disabled
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="TransactionDetails.CommissionCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Commission Currency
          </label>
          <input
            type="text"
            id="TransactionDetails.CommissionCurrency"
            name="TransactionDetails.CommissionCurrency"
            value={formData.TransactionDetails.CommissionCurrency}
            onChange={handleChange}
            required
            disabled
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="TransactionDetails.FundsPurpose" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Funds purpose
          </label>
          <input
            type="text"
            id="TransactionDetails.FundsPurpose"
            name="TransactionDetails.FundsPurpose"
            value={formData.TransactionDetails.FundsPurpose}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <Button 
        onClick={() => document.getElementById("popup-modal").classList.remove("hidden")}
        className="mt-4 mt-5 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        type="button"
        >
          Create transaction
        </Button>

        <div className='flex flex-end mt-4'>
            <button 
            className='mr-auto border p-2 rounded-md'
            type='button'
            onClick={()=>{
                setCurrentStep(4)
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            }}
            >Previous</button>
        </div>

          
      </>}

      <div
        id="popup-modal"
        className="hidden fixed inset-0 z-50 flex justify-center w-full h-screen p-4 overflow-x-hidden bg-black bg-opacity-50"
        onClick={(e) => {
          if (e.target.id === "popup-modal") {
            document.getElementById("popup-modal").classList.add("hidden");
          }
        }}
      >
        <div
          className="relative w-full h-full overflow-y-auto max-w-3xl px-6 py-10 mx-auto bg-white rounded-lg shadow dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white focus:outline-none"
            data-modal-hide="popup-modal"
            onClick={() => document.getElementById("popup-modal").classList.add("hidden")}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          {/* Modal content */}
          <div className="mt-10 text-center">
            {/* Modal icon */}
            <svg
              className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            {/* Logo */}
            <img src="/logo/light.png" alt="Logo" className="logo" />

            <h3 className="mb-5 text-lg font-medium text-gray-700 dark:text-gray-300">
              Are you sure you want to complete this transaction?
            </h3>

            {/* Tables Section */}
            <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
              {/* Receiver Details Table */}
              <table className="min-w-full bg-white rounded-lg shadow dark:bg-gray-700 table">
                <thead>
                  <tr>
                    <th colSpan="2" className="p-4 font-semibold text-left text-gray-600 dark:text-gray-200">
                      Receiver Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(formData.ReceiverDetails).map(([key, value]) => (
                    <tr key={key} className="border-t">
                      <th className="p-2 font-normal text-gray-500 dark:text-gray-300 th">{key}</th>
                      <td className="p-2 font-medium text-gray-700 dark:text-gray-100 td">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Sender Details Table */}
              <table className="min-w-full bg-white rounded-lg shadow dark:bg-gray-700 table">
                <thead>
                  <tr>
                    <th colSpan="2" className="p-4 font-semibold text-left text-gray-600 dark:text-gray-200">
                      Sender Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(formData.SenderDetails).map(([key, value]) => (
                    <tr key={key} className="border-t">
                      <th className="p-2 font-normal text-gray-500 dark:text-gray-300 th">{key}</th>
                      <td className="p-2 font-medium text-gray-700 dark:text-gray-100 td">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Transaction Details Table */}
              <table className={`min-w-full bg-white rounded-lg shadow dark:bg-gray-700 table ${isBankDetailsEmpty(formData.BankDetails) && 'lg: col-span-2'}`}>
                <thead>
                  <tr>
                    <th colSpan="2" className="p-4 font-semibold text-left text-gray-600 dark:text-gray-200">
                      Transaction Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(formData.TransactionDetails).map(([key, value]) => (
                    <tr key={key} className="border-t">
                      <th className="p-2 font-normal text-gray-500 dark:text-gray-300 th">{key}</th>
                      <td className="p-2 font-medium text-gray-700 dark:text-gray-100 td">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Bank Details Table */}
              {!isBankDetailsEmpty(formData.BankDetails) && (
                <table className="min-w-full bg-white rounded-lg shadow dark:bg-gray-700 table">
                  <thead>
                    <tr>
                      <th colSpan="2" className="p-4 font-semibold text-left text-gray-600 dark:text-gray-200">
                        Bank Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(formData.BankDetails).map(([key, value]) => (
                      <tr key={key} className="border-t">
                        <th className="p-2 font-normal text-gray-500 dark:text-gray-300 th">{key}</th>
                        <td className="p-2 font-medium text-gray-700 dark:text-gray-100 td">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Confirm & Cancel buttons */}
            <div className="flex justify-center gap-4">
              <Button className="mt-5 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" block type="submit" disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center">
                    Loading...
                  </span>
                ) : (
                  "Yes, I'm sure"
                )}
              </Button>
              <button
                data-modal-hide="popup-modal"
                type='button'
                onClick={() => document.getElementById("popup-modal").classList.add("hidden")}
                className="px-5 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>


      
    </form>
  </div>
  );
}

export default CreateTransaction;
