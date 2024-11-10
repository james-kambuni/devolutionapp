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

const TransactionCommentsTable = ({ resultsPerPage, filter, comments }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    

    const totalResults = comments.length;

  // Methods
    const onPageChange = (p) => {
      setPage(p);
    };


    useEffect(() => {
      const filteredComments = Array.isArray(comments)
        ? (filter
            ? comments.filter((comment) =>
                comment.FirstName?.toLowerCase().includes(filter.toLowerCase())
              )
            : comments)
        : [];
    
      setData(filteredComments.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [page, resultsPerPage, filter, comments]);


  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Commented By</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Transaction Comments</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{data.CommentBy}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.CreatedDate}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.TxComment}</span>
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

export default TransactionCommentsTable;
