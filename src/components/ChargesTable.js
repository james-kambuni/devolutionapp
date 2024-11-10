import React, { useState, useEffect } from "react";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Pagination,
} from "@windmill/react-ui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {useHistory} from 'react-router-dom'

const ChargesTable = ({ resultsPerPage, filter, charges }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);


    const totalResults = charges.length;

    const history = useHistory()

  // Methods
    const onPageChange = (p) => {
      setPage(p);
    };


    useEffect(() => {
      const filteredCharges = filter
        ? charges.filter((charge) =>
            charge.FirstName.toLowerCase().includes(filter.toLowerCase())
          )
        : charges;

      setData(filteredCharges.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [page, resultsPerPage, filter, charges]);

    const handleEdit = (e, id) => {
      e.preventDefault();
      history.push('/charge/edit-charge/'+id)
    }

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Charge</TableCell>
              <TableCell>Delivery Method Code</TableCell>
              <TableCell>Destination Country</TableCell>
              <TableCell>Is rate</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{data.ChargeName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.DeliveryMethodCode}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.DestinationCountry}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.IsRate}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.Value}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm cursor-pointer"><FontAwesomeIcon icon={faEdit} onClick={(e)=>{
                    handleEdit(e, data.ChargeId)
                  }} /></span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
    </div>
  );
};

export default ChargesTable;
