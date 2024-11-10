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

const BranchesTable = ({ resultsPerPage, filter, branches }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);


    const totalResults = branches.length;


  // Methods
    const onPageChange = (p) => {
      setPage(p);
    };


    useEffect(() => {
      const filteredBranches = filter
        ? branches.filter((branch) =>
            branch.FirstName.toLowerCase().includes(filter.toLowerCase())
          )
        : branches;

      setData(filteredBranches.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [page, resultsPerPage, filter, branches]);

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Branch Name</TableCell>
              <TableCell>Branch Address</TableCell>
              <TableCell>Contacts</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Country code</TableCell>
              <TableCell>Created at</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{data.BranchName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.BranchAddress}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.Contacts}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.EmailAddress}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.CountryCode}</span>
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

export default BranchesTable;
