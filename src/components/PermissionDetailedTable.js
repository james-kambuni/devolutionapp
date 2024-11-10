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

const PermissionDetailedTable = ({ resultsPerPage, filter, permissions }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);


    const totalResults = permissions.length;


  // Methods
    const onPageChange = (p) => {
      setPage(p);
    };


    useEffect(() => {
      const filteredPermissions = filter
        ? permissions.filter((permission) =>
            permission.FirstName.toLowerCase().includes(filter.toLowerCase())
          )
        : permissions;

      setData(filteredPermissions.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [page, resultsPerPage, filter, permissions]);

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Permission</TableCell>
              <TableCell>Permission description</TableCell>
              <TableCell>Created at</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{data.PermissionName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.PermissionDescription}</span>
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

export default PermissionDetailedTable;
