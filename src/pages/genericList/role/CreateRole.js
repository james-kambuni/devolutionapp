import React, { useState } from 'react';
import PageTitle from '../../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../../Api';
import { useHistory } from 'react-router-dom';
import { Button } from '@windmill/react-ui';

function CreateRole() {
  // Data & states
  const [formData, setFormData] = useState({
    UserType: '',
    RoleName: '',
    RoleDescription: ''
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ServiceCode: 'CREATE_ROLE',
      ...formData,
    };

    try {
      let response = await api.create(payload);

      if (response.Response === '000') {
        setLoading(false);
        toast.success(response.ResponseDescription);
        setFormData({
            UserType: '',
            RoleName: '',
            RoleDescription: ''
        });
        history.push('/settings/list-roles');
      } else {
        setLoading(false);
        toast.error('Role Creation Failure: ' + response.ResponseDescription);
      }
    } catch (error) {
      toast.error('Role Creation Failure: ' + error);
    }
  };


  return (
    <div className="flex flex-col py-8">
      <form
        className="w-full self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 rounded-md flex flex-col shadow-sm"
        onSubmit={handleSubmit}
      >
        <PageTitle>Create new role</PageTitle>

        <div className="mb-5">
          <label htmlFor="UserType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            User type
          </label>
          <input
            type="text"
            id="UserType"
            name="UserType"
            value={formData.UserType}
            onChange={handleChange}
            required
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="RoleName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Role Name
          </label>
          <input
            type="text"
            id="RoleName"
            name="RoleName"
            value={formData.RoleName}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="RoleDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Role description
          </label>
          <textarea
            id="RoleDescription"
            name="RoleDescription"
            value={formData.RoleDescription}
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
            "Create Role"
          )}
        </Button>
      </form>
    </div>
  );
}

export default CreateRole;
