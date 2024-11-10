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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";

const RolesTable = ({ resultsPerPage, filter, roles }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);


    const totalResults = roles.length;
    const history = useHistory();

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

  const handleEdit = (e, id) => {
    e.preventDefault();
    history.push('/settings/edit-role/'+id)
  }

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Role</TableCell>
              <TableCell>User type</TableCell>
              <TableCell>Role description</TableCell>
              <TableCell>Action</TableCell>
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
                  <span className="text-sm flex items-center gap-2">
                    <FontAwesomeIcon icon={faEye} className="cursor-pointer" />
                    <FontAwesomeIcon icon={faEdit} className="cursor-pointer" onClick={(e)=>handleEdit(e, data.RoleId)} />
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

export default RolesTable;
