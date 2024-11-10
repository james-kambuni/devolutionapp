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

const CountryManagersPerCountryTable = ({ resultsPerPage, filter, countryManagers }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);


    const totalResults = countryManagers.length;


  // Methods
    const onPageChange = (p) => {
      setPage(p);
    };


    useEffect(() => {
      const filteredCountryManagers = filter
        ? countryManagers.filter((countryManager) =>
            countryManager.FirstName.toLowerCase().includes(filter.toLowerCase())
          )
        : countryManagers;

      setData(filteredCountryManagers.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [page, resultsPerPage, filter, countryManagers]);

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Manager Name</TableCell>
              <TableCell>Country Manager Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Country code</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{data.FirstName} {data.MiddleName} {data.LastName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.Address}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.PhoneNumber}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.EmailAddress}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.CountryCode}</span>
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

export default CountryManagersPerCountryTable;
