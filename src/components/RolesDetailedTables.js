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

const RolesDetailedTable = ({ resultsPerPage, filter, roles }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);


    const totalResults = roles.length;


  // Methods
    const onPageChange = (p) => {
      setPage(p);
    };


    useEffect(() => {
      const filteredRoles = filter
        ? roles.filter((role) =>
            role.FirstName.toLowerCase().includes(filter.toLowerCase())
          )
        : roles;

      setData(filteredRoles.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [page, resultsPerPage, filter, roles]);

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Role</TableCell>
              <TableCell>User type</TableCell>
              <TableCell>Role description</TableCell>
              <TableCell>Created at</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{data.RoleName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.UserType}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.RoleDescription}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(data.CreatedDate).toLocaleDateString()}
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

export default RolesDetailedTable;
