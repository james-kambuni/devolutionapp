import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../Api';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';  
import { Button } from '@windmill/react-ui';

function MapRoleToUser() {
  // Data & states
  const [formData, setFormData] = useState({
    RoleId: '',
    UserId: ''
  });

  const history = useHistory();
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
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
      ServiceCode: 'MAP_USER_TO_ROLE',
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
        history.push('/settings/list-user');
      } else {
        setLoading(false);
        toast.error(response.ResponseDescription);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Map User To Role Failure: ' + error);
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

    const getUsers = async () => {
      const payload = {
        ServiceCode: 'GET_VERIFIED_USERS',
      };

      try {
        let response = await api.create(payload);
        if (response.ResponseCode === '000') {
          setUsers(response.Users);
        } else {
          toast.error('Error: Failure to get users');
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };

    getRoles();
    getUsers();
  }, []);


  const roleOptions = roles.map((role) => ({
    value: role.RoleId,
    label: role.RoleName,
  }));

  const userOptions = users.map((user) => ({
    value: user.UserId,
    label: `${user.FirstName} ${user.MiddleName} ${user.LastName}`,
  }));

  return (
    <div className="flex flex-col py-8">
      <form
        className="w-full self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 rounded-md flex flex-col shadow-sm"
        onSubmit={handleSubmit}
      >
        <PageTitle>Map User To Role</PageTitle>

        <div className="mb-5">
          <label htmlFor="UserId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select User
          </label>
          <Select
            id="UserId"
            name="UserId"
            value={userOptions.find((option) => option.value === formData.UserId)}
            onChange={handleSelectChange}
            options={userOptions}
            placeholder="Select User"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
          />
        </div>

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

        <Button className="mt-4" block type="submit" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center">
              Loading...
            </span>
          ) : (
            "Map User To Role"
          )}
        </Button>
      </form>
    </div>
  );
}

export default MapRoleToUser;
