import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import CountriesTable from "../../components/CountriesTable";
import api from "../../Api";
import { toast } from 'react-hot-toast';

const Countries = () => {
    // Data & states
        const [countries, setCountries] = useState([]);

    // Methods

    useEffect(()=>{
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'GET_COUNTRIES',
            };
        
            try {
              let response = await api.create(payload);
              
              if (response.ResponseCode === '000') {
                setCountries(response.Countries)
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
            <PageTitle>Countries</PageTitle>
        </div>


        <CountriesTable resultsPerPage={10} countries={countries} />
    </div>
  );
};

export default Countries;
