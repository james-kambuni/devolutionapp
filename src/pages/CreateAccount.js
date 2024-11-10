import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ImageDark from '../assets/img/create-account-office-dark.jpeg';
import { Input, Label, Button } from '@windmill/react-ui';
import api from '../Api';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'; 
import { toast } from 'react-hot-toast';

function Login() {
  // data & states
  const [formData, setFormData] = useState({
    EmailAddress: '',
    password: '',
    confirmPassword: '',
    agreeToPolicy: false
  });
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const history = useHistory();

  // methods
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      'ServiceCode': 'CREATE_USER',
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
      'BranchId': '1',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!"); 
      return; 
    }

    try {
      await api.create(formData); 
      console.log("User registered successfully!");
      history.push('/login'); 
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src='/img/3.jpg'
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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <form className='former' onSubmit={handleSubmit}>
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
                  <span>Password</span>
                  <div className="relative">
                    <Input
                      className="mt-1 pr-10" 
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="***************"
                      value={formData.password}
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
                      name="confirmPassword"
                      placeholder="***************"
                      value={formData.confirmPassword}
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

                <Label className="mt-6" check>
                  <Input
                    type="checkbox"
                    name="agreeToPolicy"
                    checked={formData.agreeToPolicy}
                    onChange={handleInputChange}
                  />
                  <span className="ml-2">
                    I agree to the <span className="underline">privacy policy</span>
                  </span>
                </Label>

                <Button type="submit" block className="mt-4">
                  Create account
                </Button>
              </form>

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
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
