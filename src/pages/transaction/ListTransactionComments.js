import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import TransactionCommentsTable from "../../components/TransactionCommentsTable";
import api from "../../Api";
import { toast } from 'react-hot-toast';
import { useParams } from "react-router-dom";

const ListTransactionComments = () => {
    // Data & states

        const [comments, setComments] = useState([]);

        const { id } = useParams();


    // Methods

        useEffect(()=>{
            const getData = async (e) => {
                const payload = {
                ServiceCode: 'FETCH_TRANSACTION_COMMENTS',
                TransactionNumber: id,
                };
            
                try {
                let response = await api.create(payload);
                if (response.ResponseCode === '000') {

                    setComments(response.Comments)
                    
                } else {
                    toast.error(response.ResponseCodeDescription);
                }
                } catch (error) {
                toast.error('Error: ' + error);
                }
            };

            getData()
        },[id])

        
  return (
    <div className="flex flex-col py-8">
        <div className="flex items-center justify-between">
            <PageTitle>Comments for: <span className="text-gray-600 font-bold text-3xl">{id}</span></PageTitle>
        </div>

        <TransactionCommentsTable resultsPerPage={10} comments={comments} />
    </div>
  );
};

export default ListTransactionComments;
