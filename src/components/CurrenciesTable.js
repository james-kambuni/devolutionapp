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

const CurrenciesTable = ({ resultsPerPage, filter, currencies }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);


    const totalResults = currencies.length;


  // Methods
    const onPageChange = (p) => {
      setPage(p);
    };


    useEffect(() => {
      const filteredCurrencies = filter
        ? currencies.filter((currency) =>
            currency.FirstName.toLowerCase().includes(filter.toLowerCase())
          )
        : currencies;

      setData(filteredCurrencies.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [page, resultsPerPage, filter, currencies]);

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Currency</TableCell>
              <TableCell>Currency code</TableCell>
              <TableCell>Country code</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{data.CurrencyName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.CurrencyCode}</span>
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

export default CurrenciesTable;
