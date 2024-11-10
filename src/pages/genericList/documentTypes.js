import React, {useEffect, useState} from "react";
import PageTitle from "../../components/Typography/PageTitle";
import DocumentTypesTable from "../../components/DocumentTypesTable";
import api from "../../Api";
import { toast } from 'react-hot-toast';

const DocumentTypes = () => {
    // Data & states

        const [documentTypes, setDocumentTypes] = useState([]);

    // Methods


    useEffect(()=>{
        const getData = async (e) => {
            const payload = {
              ServiceCode: 'GET_DOCUMENTTYPES',
            };
        
            try {
              let response = await api.create(payload);
              
              if (response.ResponseCode === '000') {
                setDocumentTypes(response.DocumentTypes)
              } else {
                toast.error("Error: Failure to get document types");
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
            <PageTitle>Document Types</PageTitle>
        </div>


        <DocumentTypesTable resultsPerPage={10} documentTypes={documentTypes} />
    </div>
  );
};

export default DocumentTypes;
