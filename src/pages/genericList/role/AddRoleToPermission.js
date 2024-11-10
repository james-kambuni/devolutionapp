import React, { useState, useEffect } from 'react';
import PageTitle from '../../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../../Api';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';  
import { Button } from '@windmill/react-ui';

function AddRoleToPermission() {
  // Data & states
  const [formData, setFormData] = useState({
    RoleId: '',
    PermissionId: ''
  });

  const history = useHistory();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
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
      ServiceCode: 'AT_ROLE_PERMISSION',
      ...formData,
    };

    try {
      let response = await api.create(payload);

      if (response.Response === '000') {
        setLoading(false);
        toast.success(response.ResponseDescription);
        setFormData({
            RoleId: '',
            PermissionId: ''
        });
        history.push('/settings/list-roles');
      } else {
        setLoading(false);
        toast.error('Roles Registration Failure: ' + response.ResponseDescription);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Roles Registration Failure: ' + error);
    }
  };

  useEffect(() => {
    const getRoles = async () => {
      const payload = {
        ServiceCode: 'GET_ROLES',
      };

      try {
        let response = await api.create(payload);
        if (response.ResponseCode === '000') {
          setRoles(response.Roles);
        } else {
          toast.error('Error: Failure to get roles');
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };

    const getPermissions = async () => {
      const payload = {
        ServiceCode: 'GET_PERMISSIONS',
      };

      try {
        let response = await api.create(payload);
        if (response.ResponseCode === '000') {
          setPermissions(response.Permissions);
        } else {
          toast.error('Error: Failure to get permissions');
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };

    getRoles();
    getPermissions();
  }, []);


  const roleOptions = roles.map((role) => ({
    value: role.RoleId,
    label: role.RoleName,
  }));

  const permissionOptions = permissions.map((permission) => ({
    value: permission.PermissionId,
    label: permission.PermissionName,
  }));

  return (
    <div className="flex flex-col py-8">
      <form
        className="w-full self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 rounded-md flex flex-col shadow-sm"
        onSubmit={handleSubmit}
      >
        <PageTitle>Add Role To Permission</PageTitle>

        <div className="mb-5">
          <label htmlFor="RoleId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select role
          </label>
          <Select
            id="RoleId"
            name="RoleId"
            value={roleOptions.find((option) => option.value === formData.RoleId)}
            onChange={handleSelectChange}
            options={roleOptions}
            placeholder="Select role"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="PermissionId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Permission
          </label>
          <Select
            id="PermissionId"
            name="PermissionId"
            value={permissionOptions.find((option) => option.value === formData.PermissionId)}
            onChange={handleSelectChange}
            options={permissionOptions}
            placeholder="Select Permission"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>

        <Button className="mt-4" block type="submit" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center">
              Loading...
            </span>
          ) : (
            "Add role to permission"
          )}
        </Button>
      </form>
    </div>
  );
}

export default AddRoleToPermission;
