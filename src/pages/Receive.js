import React, {useState} from 'react'
import PageTitle from '../components/Typography/PageTitle';
import { Button } from '@windmill/react-ui';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Card, CardBody } from '@windmill/react-ui'

function Receive() {

  const [formData, setFormData] = useState({
    TransactionNumber: '',
  })
  const history = useHistory()

  // Methods


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleGoToTransactionShowPage = (e) => {
    e.preventDefault();
    history.push('/app/show-agent-transaction/'+formData.TransactionNumber)
  };


  return (
    <div className='flex flex-col dark:text-gray-400'>
      <div className="grid gap-6 mt-20 mb-6 grid-cols-1 lg:grid-cols-4">
        <Card className="col-span-2">
            <CardBody className="flex flex-col">
                <PageTitle>Receive Funds</PageTitle>
                <p className='mb-4'>Enter the transaction number below to start processing transaction</p>
                <input
                    type="text"
                    id="TransactionNumber"
                    name="TransactionNumber"
                    value={formData.TransactionNumber}
                    placeholder='Enter Transaction Number'
                    onChange={handleChange}
                    required
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
                />

                <Button className="mt-4" block type="submit" onClick={handleGoToTransactionShowPage}>
                    Search Transaction
                </Button>
            </CardBody>
        </Card>
      </div>

    </div>
  )
}

export default Receive
