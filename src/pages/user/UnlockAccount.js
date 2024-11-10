import React, { useState } from 'react';
import PageTitle from '../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../Api';
import { useHistory, useParams } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';  
import { Input, Label } from '@windmill/react-ui';
import { Button } from '@windmill/react-ui';

function UnlockAccount() {

  const {email} = useParams();

  const [formData, setFormData] = useState({
    ServiceCode: 'UNLOCK_ACCOUNT',
    EmailAddress: email,
  });

  const history = useHistory();
  const [loading, setLoading] = useState(false);

  // Methods

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      'ServiceCode': 'UNLOCK_ACCOUNT',
      ...prevData,
      [name]: value,
    }));
  };

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
            confirmPassword: '',
        })
        history.push('/settings/list-user');
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


  return (
    <div className="flex flex-col py-8">
      <form
        className="w-full self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 rounded-md flex flex-col shadow-sm"
        onSubmit={handleSubmit}
      >
        <PageTitle>Unlock account</PageTitle>

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

        <Button className="mt-4" block type="submit" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center">
              Loading...
            </span>
          ) : (
            "Unlock Account"
          )}
        </Button>
      </form>
    </div>
  );
}

export default UnlockAccount;
