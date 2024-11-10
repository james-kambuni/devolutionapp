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

const BranchAccountBalancesTable = ({ resultsPerPage, filter, branchAccountBalances }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);


    const totalResults = branchAccountBalances.length;


  // Methods
    const onPageChange = (p) => {
      setPage(p);
    };


    useEffect(() => {
      const filteredBranchAccountBalances = filter
        ? branchAccountBalances.filter((branchAccountBalance) =>
            branchAccountBalance.FirstName.toLowerCase().includes(filter.toLowerCase())
          )
        : branchAccountBalances;

      setData(filteredBranchAccountBalances.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [page, resultsPerPage, filter, branchAccountBalances]);

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Currency Code</TableCell>
              <TableCell>Float Balance</TableCell>
              <TableCell>Float Account</TableCell>
              <TableCell>In Commission Account</TableCell>
              <TableCell>In Commission Balance</TableCell>
              <TableCell>Out Commission Account</TableCell>
              <TableCell>Out Commission Balance</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{data.CurrencyCode}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.FloatBalance}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.FloatAccount}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.InCommissionAccount}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.InCommissionBalance}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.OutCommissionAccount}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.OutCommissionBalance}</span>
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

export default BranchAccountBalancesTable;