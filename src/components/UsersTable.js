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
import { faEdit, faUnlock } from '@fortawesome/free-solid-svg-icons';
import {useHistory} from 'react-router-dom'

import * as Icons from "../icons";

function Icon({ icon, ...props }) {
  const IconComponent = Icons['PeopleIcon'];
  return <IconComponent {...props} />;
}

const UsersTable = ({ resultsPerPage, filter, users }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);


    const totalResults = users.length;

    const history = useHistory()

  // Methods
    const onPageChange = (p) => {
      setPage(p);
    };


    useEffect(() => {
      const filteredUsers = filter
        ? users.filter((user) =>
            user.FirstName.toLowerCase().includes(filter.toLowerCase())
          )
        : users;

      setData(filteredUsers.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [page, resultsPerPage, filter, users]);

    const handleEdit = (e, email) => {
      e.preventDefault();
      history.push('/update-user-password/'+email)
    }

    const handleUnlock = (e, email) => {
      e.preventDefault();
      history.push('/settings/unlock-account/'+email)
    }
  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm gap-4">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">{user.FirstName} {user.MiddleName} {user.LastName}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.EmailAddress}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.PhoneNumber}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.UserType}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm flex items-center gap-2">
                    <FontAwesomeIcon icon={faEdit} className="cursor-pointer" onClick={(e)=>{
                    handleEdit(e, user.EmailAddress)
                  }} />

                  <FontAwesomeIcon icon={faUnlock} className="cursor-pointer" onClick={(e)=>{
                    handleUnlock(e, user.EmailAddress)
                  }} />
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

export default UsersTable;
