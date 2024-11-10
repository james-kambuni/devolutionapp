import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import TransactionsTable from "../../components/TransactionsTable";
import api from "../../Api";
import { toast } from 'react-hot-toast';

const ListTransaction = () => {
    // Data & states

        const [transactions, setTransactions] = useState([]);

        const [formData, setFormData] = useState({
             Status: 'INITIATED',
        })

    // Methods

        useEffect(()=>{
            const getData = async (e) => {
                const payload = {
                ServiceCode: 'FETCH_TXNS_BYSTATUS',
                ...formData,
                };
            
                try {
                let response = await api.create(payload);
                if (response.ResponseCode === '000') {

                    setTransactions(response.Transanctions)
                    
                } else {
                    toast.error("Error: Failure to get transactions");
                }
                } catch (error) {
                toast.error('Error: ' + error);
                }
            };

            getData()
        },[formData])


        const handleSelectChange9 = (event) => {

            const { value } = event.target;
        
            setFormData((prevData) => ({
              ...prevData,
              Status: value
            }));
          };
        
  return (
    <div className="flex flex-col py-8">
        <div className="flex items-center justify-between">
            <PageTitle>Manage Transactions</PageTitle>

            <div className="px-4">
                <select
                id="Status"
                name="Status"
                value={formData.Status}
                onChange={handleSelectChange9}
                required
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
                >
                <option value="">Select ...</option>
                <option value="CANCELLED">CANCELLED</option>
                <option value="INITIATED">INITIATED</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="SUSPENDED">SUSPENDED</option>
                <option value="FAILED">FAILED</option>
                </select>
            </div>

            <div></div>
        </div>

        <TransactionsTable resultsPerPage={10} transactions={transactions} />
    </div>
  );
};

export default ListTransaction;
