import React, { useState } from 'react';
import PageTitle from '../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../Api';
import { useHistory, useParams } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';  
import { Input, Label } from '@windmill/react-ui';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'; 
import { Button } from '@windmill/react-ui';

import * as Icons from "../../icons";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function UpdateUserPassword() {

  const {email} = useParams();

  const [formData, setFormData] = useState({
    EmailAddress: email,
    NewPassword: '',
    CurrentPassword: '',
    ConfirmPassword: '',
  });

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      'ServiceCode': 'CHANGE_PASSWORD',
      ...prevData,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); 

    // Methods   

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response = await api.create(formData);

      if (response.Response === '000') {
        setLoading(false);
        toast.success(response.ResponseDescription);
        setFormData({
            EmailAddress: '',
            password: '',
            ConfirmPassword: '',
        })
        history.push('/login');
      } else {
        setLoading(false);
        toast.error(response.ResponseDescription);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('Password Update Failure: ' + error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('user');
    toast.success("Logout successfully, Bye!");
    history.push('/login');
  }

  return (

    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">

            <form
              className="w-full former self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 flex flex-col shadow-sm"
              onSubmit={handleSubmit}
            >
              <PageTitle>Update Your Password</PageTitle>

              <Label>
                  <span>Email</span>
                  <Input
                  className="mt-1"
                  type="email"
                  name="EmailAddress"
                  placeholder="john@doe.com"
                  value={formData.EmailAddress}
                  onChange={handleInputChange}
                  />
              </Label>

              <Label className="mt-4">
                  <span>Current Password</span>
                  <div className="relative">
                  <Input
                      className="mt-1 pr-10" 
                      type={showCurrentPassword ? "text" : "password"}
                      name="CurrentPassword"
                      placeholder="***************"
                      value={formData.CurrentPassword}
                      onChange={handleInputChange}
                  />
                  <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={toggleCurrentPasswordVisibility}
                  >
                      {showCurrentPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                      )}
                  </button>
                  </div>
              </Label>

              <Label className="mt-4">
                  <span>New Password</span>
                  <div className="relative">
                  <Input
                      className="mt-1 pr-10" 
                      type={showPassword ? "text" : "password"}
                      name="NewPassword"
                      placeholder="***************"
                      value={formData.NewPassword}
                      onChange={handleInputChange}
                  />
                  <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={togglePasswordVisibility}
                  >
                      {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                      )}
                  </button>
                  </div>
              </Label>

              <Label className="mt-4">
                  <span>Confirm password</span>
                  <div className="relative">
                  <Input
                      className="mt-1 pr-10" 
                      type={showConfirmPassword ? "text" : "password"}
                      name="ConfirmPassword"
                      placeholder="***************"
                      value={formData.ConfirmPassword}
                      onChange={handleInputChange}
                  />
                  <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={toggleConfirmPasswordVisibility}
                  >
                      {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                      )}
                  </button>
                  </div>
              </Label>


              <Button className="mt-4" block type="submit" disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center">
                    Loading...
                  </span>
                ) : (
                  "Update Your Password"
                )}
              </Button>
            </form>

            <li className="relative px-6 pt-3 list-none">
              <button
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                onClick={handleLogout}
              >
                <Icon
                  className="w-5 h-5"
                  aria-hidden="true"
                  icon="OutlineLogoutIcon"
                />
                <span className="ml-4">Logout</span>
              </button>
            </li>
          </div>
    </div>
  );
}

export default UpdateUserPassword;
