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
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye } from '@fortawesome/free-solid-svg-icons';

const AgentAccountsTable2 = ({ resultsPerPage, filter, agentAccounts }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);


    const totalResults = agentAccounts.length;


  // Methods
    const onPageChange = (p) => {
      setPage(p);
    };


    useEffect(() => {
      const filteredAgentAccounts = filter
        ? agentAccounts.filter((agentAccount) =>
            agentAccount.FirstName.toLowerCase().includes(filter.toLowerCase())
          )
        : agentAccounts;

      setData(filteredAgentAccounts.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [page, resultsPerPage, filter, agentAccounts]);

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Currency Code</TableCell>
              <TableCell>Float Account</TableCell>
              <TableCell>Float Balance</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{data.CurrencyCode}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.FloatAccount}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.FloatBalance}</span>
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

export default AgentAccountsTable2;
