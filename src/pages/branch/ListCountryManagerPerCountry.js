import React, { useEffect, useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import CountryManagersPerCountryTable from "../../components/CountryManagersTable";
import api from "../../Api";
import { toast } from 'react-hot-toast';
import Select from 'react-select';

const ListCountryManagerPerCountry = () => {
    // Data & states

    const [countryManagers, setCountryManagers] = useState([]);
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState({
        CountryCode: 'ET' // default country code can be set here
    });

    // Route to create country manager page

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

    // Fetch country managers when component mounts and when CountryCode changes
    useEffect(() => {
        if (formData.CountryCode) {
            const getCountryManagers = async () => {
                const payload = {
                    ServiceCode: 'GET_CMS_PER_COUNTRY',
                    CountryCode: formData.CountryCode
                };

                try {
                    let response = await api.create(payload);
                    if (response.ResponseCode === '000') {
                        setCountryManagers(response.CountryManagers);
                    } else {
                        toast.error("Error: " + response.ResponseDescription);
                    }
                } catch (error) {
                    toast.error('Error: ' + error);
                }
            };

            getCountryManagers();
        }
    }, [formData.CountryCode]); // Re-fetch when CountryCode changes

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
                <PageTitle>Manage Country Managers</PageTitle>
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
                <div></div>
            </div>

            <CountryManagersPerCountryTable resultsPerPage={10} countryManagers={countryManagers} />
        </div>
    );
};

export default ListCountryManagerPerCountry;
