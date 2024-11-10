import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../Api';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';  
import { Button } from '@windmill/react-ui';

function CreateDeliveryMethod() {
  // Data & states
  const [formData, setFormData] = useState({
    Description: '',
    CountryCode: '',
    DeliveryMethodCode: '',
  });

  const history = useHistory();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Methods
  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ServiceCode: 'CREATE_OR_UPDATE_DELIVERY_METHOD',
      ...formData,
    };

    try {
      let response = await api.create(payload);

      if (response.ResponseCode === '000') {
        setLoading(false);
        toast.success(response.ResponseCodeDescription);
        setFormData({
            RoleId: '',
            PermissionId: ''
        });
        history.push('/settings/list-delivery-methods');
      } else {
        setLoading(false);
        toast.error(response.ResponseCodeDescription);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Map User To Role Failure: ' + error);
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

    getCountries();
  }, []);

  const countryOptions = countries.map((data) => ({
    value: data.CountryCode,
    label: data.Country,
  }));

  return (
    <div className="flex flex-col py-8">
      <form
        className="w-full self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 rounded-md flex flex-col shadow-sm"
        onSubmit={handleSubmit}
      >
        <PageTitle>Create Delivery Method</PageTitle>

        <div className="mb-5">
          <label htmlFor="CountryCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Country
          </label>
          <Select
            id="CountryCode"
            name="CountryCode"
            value={countryOptions.find((option) => option.value === formData.CountryCode)}
            onChange={handleSelectChange}
            options={countryOptions}
            placeholder="Select Country"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="DeliveryMethodCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Delivery Method Code
          </label>
          <input
            type="text"
            id="DeliveryMethodCode"
            name="DeliveryMethodCode"
            value={formData.DeliveryMethodCode}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Description
          </label>
          <textarea
            id="Description"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <Button className="mt-4" block type="submit" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center">
              Loading...
            </span>
          ) : (
            "Create Delivery Method"
          )}
        </Button>
      </form>
    </div>
  );
}

export default CreateDeliveryMethod;
