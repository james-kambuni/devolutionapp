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
import { useHistory } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from "../Api";


import * as Icons from "../icons";

function Icon({ icon, ...props }) {
  const IconComponent = Icons['PeopleIcon'];
  return <IconComponent {...props} />;
}

const PendingUsersTable = ({ resultsPerPage, filter, users }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);


    const totalResults = users.length;

    const history = useHistory();


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


    const handleSubmit = async (e, user) => {
        e.preventDefault();
    
        const payload = {
          ServiceCode: 'VERIFY_USER',
          UserId: user.UserId,
          Action: "Verified",
          Comments:"User verified"
        };
    
        try {
          let response = await api.create(payload);
    
          console.log(response);
          
    
          if (response.Response === '000') {
            toast.success(response.ResponseDescription);
            if(user.UserType === 'AG') {
              history.push('/agent/create-agent-commission');
            }else {
              history.push('/settings/list-users');
            }
          } else {
            toast.error("User verification failure: " + response.ResponseDescription);
          }
        } catch (error) {
          console.log(error);
          toast.error('Verification failed: ' + error);
        }
      };

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
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
                  <span className="text-sm cursor-pointer border p-2 rounded-md hover:bg-blue-500 hover:text-white" onClick={(e)=>{
                    handleSubmit(e, user)
                  }}>approve</span>
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

export default PendingUsersTable;
