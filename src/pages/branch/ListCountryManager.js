import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import CountryManagersTable from "../../components/CountryManagersTable";
import api from "../../Api";
import { toast } from 'react-hot-toast';

const ListCountryManager = () => {
    // Data & states

        const [countryManagers, setCountryManagers] = useState([]);

    // Methods

    useEffect(()=>{
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'GET_ALL_CMS',
            };
        
            try {
              let response = await api.create(payload);
              if (response.ResponseCode === '000') {
                setCountryManagers(response.CountryManagers)
              } else {
                toast.error("Error: Failure to get country managers");
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
            <PageTitle>Manage Country Managers</PageTitle>
        </div>


        <CountryManagersTable resultsPerPage={10} countryManagers={countryManagers} />
    </div>
  );
};

export default ListCountryManager;
