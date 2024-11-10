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

const AgentsTable = ({ resultsPerPage, filter, agents }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);


    const totalResults = agents.length;


  // Methods
    const onPageChange = (p) => {
      setPage(p);
    };


    useEffect(() => {
      const filteredAgents = filter
        ? agents.filter((agent) =>
            agent.FirstName.toLowerCase().includes(filter.toLowerCase())
          )
        : agents;

      setData(filteredAgents.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [page, resultsPerPage, filter, agents]);

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Agent</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Country code</TableCell>
              <TableCell>City</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{data.FirstName} {data.MiddleName} {data.LastName}</span>
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
                <TableCell>
                  <span className="text-sm">{data.City}</span>
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

export default AgentsTable;
