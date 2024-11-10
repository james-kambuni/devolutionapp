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

const AccountTypesTable = ({ resultsPerPage, filter, accounts }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);


    const totalResults = accounts.length;


  // Methods
    const onPageChange = (p) => {
      setPage(p);
    };


    useEffect(() => {
      const filteredAccounts = filter
        ? accounts.filter((account) =>
            account.FirstName.toLowerCase().includes(filter.toLowerCase())
          )
        : accounts;

      setData(filteredAccounts.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [page, resultsPerPage, filter, accounts]);

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Account Type</TableCell>
              <TableCell>Account Type ID</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>description</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{data.AccType}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.AccTypeId}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.UserType}</span>
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

export default AccountTypesTable;
