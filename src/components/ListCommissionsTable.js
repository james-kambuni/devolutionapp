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

const ListCommissionsTable = ({ resultsPerPage, filter, commissions }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);


    const totalResults = commissions.length;


  // Methods
    const onPageChange = (p) => {
      setPage(p);
    };


    useEffect(() => {
      const filteredCommissions = filter
        ? commissions.filter((commission) =>
            commission.FirstName.toLowerCase().includes(filter.toLowerCase())
          )
        : commissions;

      setData(filteredCommissions.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [page, resultsPerPage, filter, commissions]);

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Full filling Branch</TableCell>
              <TableCell>HQ</TableCell>
              <TableCell>Initiating Branch</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{data.FullfillingBranch}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{data.HQ}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{data.InitiatingBranch}</span>
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

export default ListCommissionsTable;
