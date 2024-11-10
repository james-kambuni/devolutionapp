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

const DeliveryMethodsTable = ({ resultsPerPage, filter, deliveryMethods }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);


    const totalResults = deliveryMethods.length;


  // Methods
    const onPageChange = (p) => {
      setPage(p);
    };


    useEffect(() => {
      const filteredDeliveryMethods = filter
        ? deliveryMethods.filter((deliveryMethod) =>
            deliveryMethod.FirstName.toLowerCase().includes(filter.toLowerCase())
          )
        : deliveryMethods;

      setData(filteredDeliveryMethods.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [page, resultsPerPage, filter, deliveryMethods]);

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>DeliveryMethod</TableCell>
              <TableCell>Country code</TableCell>
              <TableCell>Description</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{data.DeliveryMethodCode}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.CountryCode}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.Description}</span>
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

export default DeliveryMethodsTable;
