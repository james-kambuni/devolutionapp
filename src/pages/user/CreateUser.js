import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../Api';
import { useHistory } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';  
import Select from 'react-select'; 
import { Button } from '@windmill/react-ui';

function CreateUser() {

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
    BranchId: '',
    UserType: ''
  });

  const [branches, setBranches] = useState([]);
  const [userTypes, setUserTypes] = useState([]);

  const history = useHistory();
  const [loading, setLoading] = useState(false);

  // Methods

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
    setLoading(true);

    const payload = {
      ServiceCode: 'CREATE_USER',
      ...formData,
    };

    try {
      let response = await api.create(payload);

      if (response.Response === '000') {
        setLoading(false);
        toast.success(response.ResponseDescription);
        setFormData({
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
        })

        history.push('/agent/list-pending-users');
      } else {
        setLoading(false);
        toast.error("User registration failure: " + response.ResponseDescription);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Registration failed: ' + error);
    }
  };

  useEffect(()=>{
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

    const getUserTypes = async () => {
      const payload = {
        ServiceCode: 'GET_USER_TYPES',
      };

      try {
        let response = await api.create(payload);
        if (response.ResponseCode === '000') {
          setUserTypes(response.UserTypes);
        } else {
          toast.error(response.ResponseDescription);
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };

    getBranches();
    getUserTypes();
  },[])

  const branchOptions = branches.map((branch) => ({
    value: branch.BranchId,
    label: branch.BranchName,
  }));

  const userTypeOptions = userTypes.map((data) => ({
    value: data.UserType,
    label: data.UserTypeDescription,
  }));


  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption.value,
    }));
  };


  return (
    <div className="flex flex-col py-8">
      <form
        className="w-full self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 rounded-md flex flex-col shadow-sm"
        onSubmit={handleSubmit}
      >
        <PageTitle>Create new user</PageTitle>


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
            placeholder="Select Branch"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>


        <div className="mb-5">
          <label htmlFor="UserType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select User  Type
          </label>
          <Select
            id="UserType"
            name="UserType"
            value={userTypeOptions.find((option) => option.value === formData.UserType)}
            onChange={handleSelectChange}
            options={userTypeOptions}
            placeholder="Select User Types"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>

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
            "Create User"
          )}
        </Button>
      </form>
    </div>
  );
}

export default CreateUser;
