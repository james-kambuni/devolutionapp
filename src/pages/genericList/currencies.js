import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import CurrenciesTable from "../../components/CurrenciesTable";
import api from "../../Api";
import { toast } from 'react-hot-toast';

const Currencies = () => {
    // Data & states

        const [currencies, setCurrencies] = useState([]);

    // Methods

    useEffect(()=>{
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'GET_CURRENCIES',
            };
        
            try {
              let response = await api.create(payload);
              
              if (response.ResponseCode === '000') {
                setCurrencies(response.Currencies)
              } else {
                toast.error("Error: Failure to get user types");
              }
            } catch (error) {
              toast.error('Error: ' + error);
            }
          };

        getData()
    },[])

  return (
    <div className="flex flex-col py-8">
        <div className="flex items-center justify-between">
            <PageTitle>Currencies</PageTitle>
        </div>


        <CurrenciesTable resultsPerPage={10} currencies={currencies} />
    </div>
  );
};

export default Currencies;
