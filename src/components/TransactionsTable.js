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
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";

const TransactionsTable = ({ resultsPerPage, filter, transactions }) => {
  // Data
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    

    const totalResults = transactions.length;
    const history = useHistory();

  // Methods
    const onPageChange = (p) => {
      setPage(p);
    };


    useEffect(() => {
      const filteredTransactions = Array.isArray(transactions)
        ? (filter
            ? transactions.filter((transaction) =>
                transaction.FirstName?.toLowerCase().includes(filter.toLowerCase())
              )
            : transactions)
        : [];
    
      setData(filteredTransactions.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [page, resultsPerPage, filter, transactions]);

    const handleView = (e, id) => {
      e.preventDefault();
      history.push('/app/show-transaction/'+id)
    }

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Transaction Number</TableCell>
              <TableCell>Paying Amount</TableCell>
              <TableCell>Payout Amount</TableCell>
              <TableCell>Total To Pay</TableCell>
              <TableCell>Total Commission</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{data.TransactionNumber}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.PayinCurrency} {data.PayinAmount}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.PayoutCurrency} {data.PayoutAmount}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.TotalToPayCurrency} {data.TotalToPay}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.TotalCommissionCurrency} {data.TotalCommission}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm flex items-center gap-2">
                    <FontAwesomeIcon icon={faEye} className="cursor-pointer" onClick={(e)=>handleView(e, data.TransactionNumber)} />
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

export default TransactionsTable;
