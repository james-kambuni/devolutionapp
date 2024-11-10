import React, { useEffect, useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import DeliveryMethodsTable from "../../components/DeliveryMethodsTable";
import api from "../../Api";
import { toast } from 'react-hot-toast';
import Select from 'react-select';

const DeliveryMethods = () => {
    // Data & states

    const [deliveryMethods, setDeliveryMethods] = useState([]);
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState({
        CountryCode: 'ET', // default country code can be set here
    });

    // Methods

    useEffect(() => {
        const getData = async () => {
            const payload = {
                ServiceCode: 'GET_DELIVERY_METHOD',
                CountryCode: formData.CountryCode, // use selected country code
            };

            try {
                let response = await api.create(payload);
                if (response.ResponseCode === '000') {
                    setDeliveryMethods(response.DeliveryMethods);
                } else {
                    toast.error("Error: " + response.ResponseCodeDescription);
                }
            } catch (error) {
                toast.error('Error: ' + error);
            }
        };

        getData();
    }, [formData.CountryCode]); // trigger the effect when CountryCode changes

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
                <PageTitle>Delivery Methods</PageTitle>
                <div>
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

            <DeliveryMethodsTable resultsPerPage={10} deliveryMethods={deliveryMethods} />
        </div>
    );
};

export default DeliveryMethods;
