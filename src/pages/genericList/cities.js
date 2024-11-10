import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import CitiesTable from "../../components/CitiesTable";
import api from "../../Api";
import { toast } from 'react-hot-toast';

const Cities = () => {
    // Data & states

        const [cities, setCities] = useState([]);

    // Methods

    useEffect(()=>{
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'GET_CITIES',
              CountryCode: "KE"
            };
        
            try {
              let response = await api.create(payload);
              
              if (response.ResponseCode === '000') {
                setCities(response.Cities)
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
            <PageTitle>Cities</PageTitle>
        </div>


        <CitiesTable resultsPerPage={10} cities={cities} />
    </div>
  );
};

export default Cities;
