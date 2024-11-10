import React, { useState } from 'react';
import PageTitle from '../../components/Typography/PageTitle';
import { toast } from 'react-hot-toast';
import api from '../../Api';
import { useHistory } from 'react-router-dom'; 
import { Button } from '@windmill/react-ui';
import { useParams } from "react-router-dom";

function CreateTransactionComment() {
  // Data & states

  const { id } = useParams();


  const [formData, setFormData] = useState({
    TransactionNumber: id,
    Comment: '',
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
      ServiceCode: 'COMMENT_TRANSACTION',
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
        history.push('/app/show-transaction-comments/'+id);
      } else {
        setLoading(false);
        toast.error(response.ResponseDescription);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Map User To Role Failure: ' + error);
    }
  };

  return (
    <div className="flex flex-col py-8">
      <form
        className="w-full self-center bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-8 rounded-md flex flex-col shadow-sm"
        onSubmit={handleSubmit}
      >
        <PageTitle><span className='font-bold text-3xl'>{id}</span></PageTitle>

        <div className="mb-5">
          <label htmlFor="Comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Comment
          </label>
          <textarea
            id="Comment"
            name="Comment"
            value={formData.Comment}
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
            "Create Comment"
          )}
        </Button>
      </form>
    </div>
  );
}

export default CreateTransactionComment;
