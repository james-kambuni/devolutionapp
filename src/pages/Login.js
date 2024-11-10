import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ImageDark from '../assets/img/login-office-dark.jpeg';
import { Label, Input, Button } from '@windmill/react-ui';
import api from '../Api';
import { toast } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useUser } from '../context/UserContext';

function Login() {
  const [formData, setFormData] = useState({
    EmailAddress: '',
    Password: ''
  });
  const [showPassword, setShowPassword] = useState(false); 
  const history = useHistory();
  const { updateUser } = useUser(); 
  const [loading, setLoading] = useState(false);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      'ServiceCode': 'LOGIN',
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await api.create(formData); 

      if (response.Response === '000') {
        setLoading(false);
        const user = {
          sessionToken: response.Session,
          userName: response.Name,
          userId: response.UserId,
          branchId: response.BranchId,
          SessionExpiry: response.SessionExpiry,
          Roles: response.Roles,
          UserType: response.UserType
        };

        updateUser(user); 
        localStorage.setItem('sessionToken', response.Session);

        toast.success(`Welcome ${response.Name}. Login was successful!`);

        const lastRoute = localStorage.getItem('lastRoute');
    
        if (lastRoute) {
          history.push(lastRoute); 
          localStorage.removeItem('lastRoute');
        } else {
          history.push('/app/dashboard');
        }
      } 
      else if (response.Response === '009') {
        setLoading(false);
        const user = {
          sessionToken: response.Session,
          userName: response.Name,
          userId: response.UserId,
          SessionExpiry: response.SessionExpiry,
          Roles: response.Roles,
          UserType: response.UserType
        };

        updateUser(user); 
        localStorage.setItem('sessionToken', response.Session);
        
        toast.success("Welcome, Login was successful!");
        history.push('/update-user-password/' + formData.EmailAddress);
      } 
      else {
        setLoading(false);
        toast.error(response.ResponseDescription);
      }

    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Login failed: " + error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src='/img/login2.jpg'
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <img src="/logo/light.png" alt="" className="w-120-px mb-4" />
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <form className='former' onSubmit={handleSubmit}>
                <Label>
                  <span>Email</span>
                  <Input
                    className="mt-1"
                    type="text"
                    name="EmailAddress"
                    placeholder="john@doe.com"
                    value={formData.EmailAddress}
                    onChange={handleInputChange}
                  />
                </Label>

                <Label className="mt-4">
                  <span>Password</span>
                  <div className="relative">
                    <Input
                      className="mt-1 pr-10" 
                      type={showPassword ? "text" : "password"}
                      name="Password"
                      placeholder="***************"
                      value={formData.Password}
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

                <Button className="mt-4" block type="submit" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center justify-center">
                      Loading...
                    </span>
                  ) : (
                    "Log in"
                  )}
                </Button>
              </form>

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>

              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
