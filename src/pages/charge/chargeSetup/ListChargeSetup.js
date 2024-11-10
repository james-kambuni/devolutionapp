import React, {useEffect, useState} from "react";
import PageTitle from "../../../components/Typography/PageTitle";
import ChargesTable from "../../../components/ChargesTable";
import {useHistory} from 'react-router-dom'
import api from "../../../Api";
import { toast } from 'react-hot-toast';
import Select from 'react-select';

const ListChargeSetup = () => {
    // Data & states
        const history = useHistory()

        const [charges, setCharges] = useState([]);

        const [countries, setCountries] = useState([]);
        const [formData, setFormData] = useState({
            CountryCode: 'ET' // default country code can be set here
        });
    // Methods

    const routeToCreatePage = (e) => {
        e.preventDefault();
        history.push('/charge/create-charge')
    }

    useEffect(()=>{
      if (formData.CountryCode) {
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'GET_CHARGES',
              CountryCode: formData.CountryCode
            };
        
            try {
              let response = await api.create(payload);
              if (response.ResponseCode === '000') {
                setCharges(response.Charges)
              } else {
                toast.error("Error: Failure to get charges");
              }
            } catch (error) {
              toast.error('Error: ' + error);
            }
          };

        getData()
      }
    },[formData.CountryCode])

    // Fetch countries on component mount
    useEffect(() => {
        const getCountries = async () => {
            const payload = {
                ServiceCode: 'GET_COUNTRIES',
            };

            try {
                let response = await api.create(payload);
                if (response.ResponseCode === '000') {
                    setCountries(response.Countries);
                } else {
                    toast.error("Error: Failure to get countries");
                }
            } catch (error) {
                toast.error('Error: ' + error);
            }
        };

        getCountries();
    }, []);

      // Map country options for the select dropdown
      const countryOptions = countries.map((country) => ({
          value: country.CountryCode,
          label: country.Country, 
      }));
  
      // Handle country selection
      const handleSelectChange = (selectedOption) => {
          setFormData((prevData) => ({
              ...prevData,
              CountryCode: selectedOption.value,
          }));
      };
  return (
    <div className="flex flex-col py-8">
        <div className="flex items-center justify-between">
            <PageTitle>Manage All Charges</PageTitle>
            <div className="">
                <Select
                    id="CountryCode"
                    name="CountryCode"
                    value={countryOptions.find((option) => option.value === formData.CountryCode)}
                    onChange={handleSelectChange}
                    options={countryOptions}
                    placeholder="Select Country"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                />
            </div>
            <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={routeToCreatePage}
            >
                Add charge
                <span className="ml-2" aria-hidden="true">
                    +
                </span>
            </button>

        </div>


        <ChargesTable resultsPerPage={10} charges={charges} />
    </div>
  );
};

export default ListChargeSetup;
