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

const CompanyAccountsTable = ({ resultsPerPage, filter, companyAccounts }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);


    const totalResults = companyAccounts.length;


  // Methods
    const onPageChange = (p) => {
      setPage(p);
    };


    useEffect(() => {
      const filteredCompanyAccounts = filter
        ? companyAccounts.filter((companyAccountType) =>
            companyAccountType.FirstName.toLowerCase().includes(filter.toLowerCase())
          )
        : companyAccounts;

      setData(filteredCompanyAccounts.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [page, resultsPerPage, filter, companyAccounts]);

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Account Type</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>Currency Code</TableCell>
              <TableCell>Current Balance</TableCell>
              <TableCell>Created At</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{data.AccType}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.AccountNumber}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.CurrencyCode}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.CurrentBalance}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(data.DateCreated).toLocaleDateString()}
                  </span>
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

export default CompanyAccountsTable;
