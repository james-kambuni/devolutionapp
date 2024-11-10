import React, { useState, useEffect } from 'react';
import PageTitle from '../../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../../Api';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';  
import { Button } from '@windmill/react-ui';

function CreateCharge() {
  // Data & states
  const [formData, setFormData] = useState({
    SourceCountry: 'ET',
    DestinationCountry: '',
    DeliveryMethodCode: '',
    ChargeName: '',
    IsRate: '',
    Value: '',
    IsRange: ''
  });

  const history = useHistory();

  const [countries, setCountries] = useState([]);
  const [deliveryMethods, setDeliveryMethods] = useState([]);
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
      ServiceCode: 'CREATE_CHARGE',
      ...formData,
    };

    try {
      let response = await api.create(payload);

      if (response.Response === '000') {
        setLoading(false);
        toast.success(response.ResponseDescription);
        setFormData({
            SourceCountry: '',
            DestinationCountry: '',
            DeliveryMethodCode: '',
            ChargeName: '',
            IsRate: '',
            Value: '',
            IsRange: ''
        });
        history.push('/charge/list-charge-setups');
      } else {
        setLoading(false);
        toast.error(response.ResponseDescription);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Rate creation Failure: ' + error);
    }
  };

  useEffect(() => {
    const getCountries = async (e) => {
        const payload = {
            ServiceCode: 'GET_COUNTRIES',
        };
    
        try {
            let response = await api.create(payload);
            
            if (response.ResponseCode === '000') {
            setCountries(response.Countries)
            } else {
            toast.error("Error: Failure to get user types");
            }
        } catch (error) {
            toast.error('Error: ' + error);
        }
        };

    getCountries();
  }, []);

  useEffect(() => {
        const getData = async () => {
            const payload = {
                ServiceCode: 'GET_DELIVERY_METHOD',
                CountryCode: formData.SourceCountry,
            };

            try {
                let response = await api.create(payload);
                if (response.ResponseCode === '000') {
                    setDeliveryMethods(response.DeliveryMethods);
                } else {
                    toast.error("Error: " + response.ResponseCodeDescription);
                }
            } catch (error) {
                toast.error('Error: ' + error);
            }
        };

        getData();
    }, [formData.SourceCountry]);


  const countryOptions = countries.map((country) => ({
    value: country.CountryCode,
    label: country.Country,
  }));

  const deliveryMethodOptions = deliveryMethods.map((deliveryMethod) => ({
    value: deliveryMethod.DeliveryMethodCode,
    label: deliveryMethod.Description,
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
      IsRate: value
    }));

  };

  const handleSelectChange11 = (event) => {

    const { value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      IsRange: value
    }));

  };

  return (
    <div className="flex flex-col py-8">
      <form
        className="w-full self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 rounded-md flex flex-col shadow-sm"
        onSubmit={handleSubmit}
      >
        <PageTitle>Create new charge</PageTitle>

        <div className="mb-5">
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


        <div className="mb-5">
          <label htmlFor="DestinationCountry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Destination Country
          </label>
          <Select
            id="DestinationCountry"
            name="DestinationCountry"
            value={countryOptions.find((option) => option.value === formData.DestinationCountry)}
            onChange={handleSelectChange}
            options={countryOptions}
            placeholder="Select destination country"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="DeliveryMethodCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Delivery Method 
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

        <div className="mb-5">
          <label htmlFor="ChargeName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Charge Name
          </label>
          <input
            type="text"
            id="ChargeName"
            name="ChargeName"
            value={formData.ChargeName}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="Value" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Value
          </label>
          <input
            type="number"
            step="any"
            id="Value"
            name="Value"
            value={formData.Value}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>


        <div className="mb-5">
          <label htmlFor="IsRate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Is Rate
          </label>
          <select
            id="IsRate"
            name="IsRate"
            value={formData.IsRate}
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
          <label htmlFor="IsRange" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Is Range
          </label>
          <select
            id="IsRange"
            name="IsRange"
            value={formData.IsRange}
            onChange={handleSelectChange11}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          >
            <option value="">Select ...</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>


        <Button className="mt-4" block type="submit" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center">
              Loading...
            </span>
          ) : (
            "Create charge"
          )}
        </Button>

      </form>
    </div>
  );
}

export default CreateCharge;
