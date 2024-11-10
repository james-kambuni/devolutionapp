import React, { useState } from 'react';
import PageTitle from '../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../Api';
// import { useHistory } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';  
import { Button } from '@windmill/react-ui';

function EditUser() {

  const [formData, setFormData] = useState({
    FirstName: '',
    MiddleName: '',
    LastName: '',
    EmailAddress: '',
    PhoneNumber: '', 
    DocumentTypeId: 'National_ID',
    DocumentNumber: '',
    CountryCode: 'GB',
    City: '',
    Address: '',
    Street: '',
  });

  const [loading, setLoading] = useState(false);

//   const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      PhoneNumber: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ServiceCode: 'CREATE_USER',
      BranchId: '1',
      UserType: 'AGA',
      ...formData,
    };

    try {
      let response = await api.create(payload);

      console.log(response);
      
      setLoading(true);
    //   if (response.Response === '000') {
    //     toast.success('User registration was successful!');
    //     history.push('/app/list-user');
    //   } else {
    //     toast.error('User registration failure');
    //   }
    } catch (error) {
      setLoading(true);
      console.log(error);
      toast.error('Registration failed: ' + error);
    }
  };

  return (
    <div className="flex flex-col py-8">
      <form
        className="w-full self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 rounded-md flex flex-col shadow-sm"
        onSubmit={handleSubmit}
      >
        <PageTitle>Edit user</PageTitle>

        <div className="mb-5">
          <label htmlFor="FirstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            First Name
          </label>
          <input
            type="text"
            id="FirstName"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="MiddleName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Middle Name
          </label>
          <input
            type="text"
            id="MiddleName"
            name="MiddleName"
            value={formData.MiddleName}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="LastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Last Name
          </label>
          <input
            type="text"
            id="LastName"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="EmailAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email Address
          </label>
          <input
            type="email"
            id="EmailAddress"
            name="EmailAddress"
            value={formData.EmailAddress}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>


        <div className="mb-5">
          <label htmlFor="PhoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Phone Number
          </label>
          <PhoneInput
            country={'gb'} 
            value={formData.PhoneNumber}
            onChange={handlePhoneChange}
            inputProps={{
              name: 'PhoneNumber',
              required: true,
            }}
            className="shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full flex flex-1"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="DocumentTypeId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Document Type
          </label>
          <select
            id="DocumentTypeId"
            name="DocumentTypeId"
            value={formData.DocumentTypeId}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          >
            <option value="National_ID">National ID</option>
            <option value="Passport">Passport</option>
            <option value="Driving_License">Driving License</option>
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="DocumentNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Document Number
          </label>
          <input
            type="text"
            id="DocumentNumber"
            name="DocumentNumber"
            value={formData.DocumentNumber}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>


        <div className="mb-5">
          <label htmlFor="City" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            City
          </label>
          <input
            type="text"
            id="City"
            name="City"
            value={formData.City}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="Address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Address
          </label>
          <input
            type="text"
            id="Address"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="Street" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Street
          </label>
          <input
            type="text"
            id="Street"
            name="Street"
            value={formData.Street}
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
            "Update User"
          )}
        </Button>
      </form>
    </div>
  );
}

export default EditUser;
