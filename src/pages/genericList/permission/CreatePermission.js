import React, { useState } from 'react';
import PageTitle from '../../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../../Api';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '@windmill/react-ui';

function CreatePermission() {
  // Data & states

  const { id } = useParams();

  const [formData, setFormData] = useState({
    PermissionId: id,
    PermissionName: '',
    PermissionDescription: ''
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
      ServiceCode: 'CREATE_PERMISSION',
      ...formData,
    };

    try {
      let response = await api.create(payload);

      if (response.Response === '000') {
        setLoading(false);
        toast.success(response.ResponseDescription);
        setFormData({
            PermissionId: '',
            PermissionName: '',
            PermissionDescription: ''
        });
        history.push('/settings/list-permissions');
      } else {
        setLoading(false);
        toast.error('Permission Update Failure: ' + response.ResponseDescription);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Permission Update Failure: ' + error);
    }
  };


  return (
    <div className="flex flex-col py-8">
      <form
        className="w-full self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 rounded-md flex flex-col shadow-sm"
        onSubmit={handleSubmit}
      >
        <PageTitle>Create permission</PageTitle>

        <div className="mb-5">
          <label htmlFor="PermissionName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Permission Name
          </label>
          <input
            type="text"
            id="PermissionName"
            name="PermissionName"
            value={formData.PermissionName}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="RoleDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Permission description
          </label>
          <textarea
            id="PermissionDescription"
            name="PermissionDescription"
            value={formData.PermissionDescription}
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
            "Create Permission"
          )}
        </Button>
      </form>
    </div>
  );
}

export default CreatePermission;
