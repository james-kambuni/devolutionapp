import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../Api";
import { toast } from "react-hot-toast";
import { Card, CardBody, Button } from '@windmill/react-ui'
import Swal from "sweetalert2";

const ShowTransaction = () => {
  // Data & states
  const [transaction, setTransaction] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  // Methods
  useEffect(() => {
    const getData = async () => {
      const payload = {
        ServiceCode: "FETCH_TRANSACTION",
        TransactionNumber: id,
      };

      try {
        let response = await api.create(payload);
        if (response.ResponseCode === "000") {
          setTransaction(response.Transanctions);
        } else {
          toast.error("Error: Failure to get transactions");
        }
      } catch (error) {
        toast.error("Error: " + error);
      }
    };

    getData();
  }, [id]);

  if (!transaction) {
    return <div>Loading...</div>;
  }


  const holdTransaction = async (e) => {
    e.preventDefault();
  
    const result = await Swal.fire({
      title: 'Are you sure you want to hold this transaction?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, hold it!',
      cancelButtonText: 'Cancel'
    });
  
    if (result.isConfirmed) {
      const payload = {
        ServiceCode: 'HOLD_TRANSACTION',
        TransactionNumber: id
      };
  
      try {
        let response = await api.create(payload);
        if (response.Response === '000') {
          toast.success(response.ResponseDescription);
        } else {
          toast.error(response.ResponseDescription);
        }
      } catch (error) {
        toast.error('Transaction hold Failure: ' + error);
      }
    }
  };
  
  const releaseTransaction = async (e) => {
    e.preventDefault();
  
    const result = await Swal.fire({
      title: 'Are you sure you want to release this transaction?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, release it!',
      cancelButtonText: 'Cancel'
    });
  
    if (result.isConfirmed) {
      const payload = {
        ServiceCode: 'RELEASE_TRANSACTION',
        TransactionNumber: id
      };
  
      try {
        let response = await api.create(payload);
        if (response.Response === '000') {
          toast.success(response.ResponseDescription);
        } else {
          toast.error(response.ResponseDescription);
        }
      } catch (error) {
        toast.error('Transaction release Failure: ' + error);
      }
    }
  };
  
  const cancelTransaction = async (e) => {
    e.preventDefault();
  
    const result = await Swal.fire({
      title: 'Are you sure you want to cancel this transaction?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'Cancel'
    });
  
    if (result.isConfirmed) {
      const payload = {
        ServiceCode: 'CANCEL_TRANSACTION',
        TransactionNumber: id
      };
  
      try {
        let response = await api.create(payload);
        if (response.Response === '000') {
          toast.success(response.ResponseDescription);
        } else {
          toast.error(response.ResponseDescription);
        }
      } catch (error) {
        toast.error('Transaction cancel Failure: ' + error);
      }
    }
  };
  
  const completeTransaction = async (e) => {
    e.preventDefault();
  
    const result = await Swal.fire({
      title: 'Are you sure you want to complete this transaction?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, complete it!',
      cancelButtonText: 'Cancel'
    });
  
    if (result.isConfirmed) {
      const payload = {
        ServiceCode: 'FULFIL_TRANSACTION',
        TransactionNumber: id
      };
  
      try {
        let response = await api.create(payload);
        if (response.Response === '000') {
          toast.success(response.ResponseDescription);
        } else {
          toast.error(response.ResponseDescription);
        }
      } catch (error) {
        toast.error('Transaction complete Failure: ' + error);
      }
    }
  };


    
  const handlePrint = (e) => {

    e.preventDefault()
    
    const printContent = `
      <html>
        <head>
          <title>Print Transaction</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }
            h1, h2 {
              font-weight: bold;
              color: #2C3E50;
            }
            table {
              width: 100%;
              margin-top: 20px;
              border-collapse: collapse;
            }
            th, td {
              padding: 10px;
              text-align: left;
              border: 1px solid #ddd;
            }
            th {
              background-color: #f4f4f4;
              font-weight: bold;
            }
            .section-title {
              margin-top: 30px;
              font-size: 20px;
              color: #2C3E50;
              border-bottom: 2px solid #ddd;
              padding-bottom: 5px;
            }
            .bold {
              font-weight: bold;
            }
            .text-right {
              text-align: right;
            }
            .total {
              font-size: 1.2em;
              font-weight: bold;
              color: #e74c3c;
            }
            .logo {
              width: 140px;
            }
          </style>
        </head>
        <body>
          <img src='/logo/light.png' class='logo' alt='' />
          <h1>Transaction Details</h1>
          
          <div class="section-title">Receiver Details</div>
          <table>
            <tr><th>Name:</th><td>${transaction.ReceiverName}</td></tr>
            <tr><th>Country:</th><td>${transaction.ReceiverCountry}</td></tr>
            <tr><th>City:</th><td>${transaction.ReceiverCity}</td></tr>
            <tr><th>Email:</th><td>${transaction.ReceiverEmail}</td></tr>
            <tr><th>Mobile:</th><td>${transaction.ReceiverMobile}</td></tr>
          </table>
          
          <div class="section-title">Sender Details</div>
          <table>
            <tr><th>Name:</th><td>${transaction.SenderName}</td></tr>
            <tr><th>Country:</th><td>${transaction.SenderCountry}</td></tr>
            <tr><th>City:</th><td>${transaction.SenderCity}</td></tr>
            <tr><th>Email:</th><td>${transaction.SenderEmail}</td></tr>
            <tr><th>Mobile:</th><td>${transaction.SenderMobile}</td></tr>
          </table>
          
          <div class="section-title">Transaction Details</div>
          <table>
            <tr><th>Total to Pay:</th><td>${transaction.TotalToPay} ${transaction.TotalToPayCurrency}</td></tr>
            <tr><th>Exchange Rate:</th><td>${transaction.ExchangeRate}</td></tr>
            <tr><th>Initiated Date:</th><td>${transaction.InitiatedDate}</td></tr>
            <tr><th>Remit Status:</th><td>${transaction.RemitStatus}</td></tr>
            <tr><th>Delivery Method:</th><td>${transaction.DeliveryMethodCode}</td></tr>
          </table>
  
          <div class="section-title">Bank Details</div>
          <table>
            <tr><th>Bank Name:</th><td>${transaction.BankName}</td></tr>
            <tr><th>Account Name:</th><td>${transaction.BankAccountName}</td></tr>
            <tr><th>Account Number:</th><td>${transaction.BankAccountNumber}</td></tr>
            <tr><th>Payout Amount:</th><td>${transaction.PayoutAmount} ${transaction.PayoutCurrency}</td></tr>
          </table>
  
          <div class="section-title">Total to Pay</div>
          <table>
            <tr><td>${transaction.TotalToPayCurrency} ${transaction.TotalToPay}</td></tr>
          </table>
        </body>
      </html>
    `;
  
    const printWindow = window.open();
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
  
    printWindow.print();
  };

  const routeToComments = (e) => {
    e.preventDefault();
    history.push('/app/show-transaction-comments/'+id)
  }
  

  const routeToCreateComments = (e) => {
    e.preventDefault();
    history.push('/app/create-transaction-comments/'+id)
  }

  const routeToForwardToBranch = (e) => {
    e.preventDefault();
    history.push('/app/forward-to-branch/'+id)
  }

  return (
    <div className="flex flex-col py-8 px-0 md:px-6 coler dark:text-gray-300">

      {transaction.DeliveryMethodCode === 'Cash Pickup at Agent' &&
      <div className="flex flex-wrap gap-4 mb-6">
          <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => holdTransaction(e)}
          >
              Hold transaction
          </button>

          <button
              type="button"
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-2 text-center inline-flex items-center me-2 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
              onClick={(e) => releaseTransaction(e)}
          >
              Release transaction
          </button>

          <button
              type="button"
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-8 py-2 text-center inline-flex items-center me-2 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
              onClick={(e) => cancelTransaction(e)}
          >
              Cancel transaction
          </button>

          <button
              type="button"
              className="text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-8 py-2 text-center inline-flex items-center me-2 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700"
              onClick={(e) => completeTransaction(e)}
          >
              Complete transaction
          </button>
      </div>}

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div className="col-span-3 md:col-span-1 flex flex-col gap-6">

          <Card>
            <CardBody>
            <h2 className="text-xl font-semibold mb-4">Receiver Details</h2>
            <table className="table-auto w-full text-left">
              <tbody>
                  <tr><th className="font-semibold">Name:</th><td>{transaction.ReceiverName}</td></tr>
                  <tr><th className="font-semibold">Country:</th><td>{transaction.ReceiverCountry}</td></tr>
                  <tr><th className="font-semibold">City:</th><td>{transaction.ReceiverCity}</td></tr>
                  <tr><th className="font-semibold">Email:</th><td>{transaction.ReceiverEmail}</td></tr>
                  <tr><th className="font-semibold">Mobile:</th><td>{transaction.ReceiverMobile}</td></tr>
              </tbody>
            </table>
            </CardBody>
          </Card>

          <Card>
          <CardBody>
              <h2 className="text-xl font-semibold mb-4">Sender Details</h2>
              <table className="table-auto w-full text-left">
                <tbody>
                  <tr><th className="font-semibold">Name:</th><td>{transaction.SenderName}</td></tr>
                  <tr><th className="font-semibold">Country:</th><td>{transaction.SenderCountry}</td></tr>
                  <tr><th className="font-semibold">City:</th><td>{transaction.SenderCity}</td></tr>
                  <tr><th className="font-semibold">Email:</th><td>{transaction.SenderEmail}</td></tr>
                  <tr><th className="font-semibold">Mobile:</th><td>{transaction.SenderMobile}</td></tr>
                </tbody>
              </table>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
            <table className="table-auto w-full text-left">
              <tbody>
                <tr>
                  <th className="boldAndGray text-xl">Total to Pay</th>
                  <td>
                    <h1 className="text-4xl boldAndGray flex items-center justify-end">
                    {transaction.TotalToPayCurrency} {transaction.TotalToPay} 
                    </h1>
                  </td>
                </tr>
              </tbody>
            </table>
            </CardBody>
          </Card>
        </div>

        <div className="col-span-3 md:col-span-1 flex flex-col gap-6">
          <h1 className="text-4xl boldAndGray flex items-center justify-end">{id}</h1>

          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>
              <table className="table-auto w-full text-left">
                <tbody>
                  <tr><th className="font-semibold">Total to Pay:</th><td>{transaction.TotalToPay} {transaction.TotalToPayCurrency}</td></tr>
                  <tr><th className="font-semibold">Exchange Rate:</th><td>{transaction.ExchangeRate}</td></tr>
                  <tr><th className="font-semibold">Initiated Date:</th><td>{transaction.InitiatedDate}</td></tr>
                  <tr><th className="font-semibold">Remit Status:</th><td>{transaction.RemitStatus}</td></tr>
                  <tr><th className="font-semibold">Delivery method:</th><td>{transaction.DeliveryMethodCode}</td></tr>
                </tbody>
              </table>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Bank Details</h2>
              <table className="table-auto w-full text-left">
                <tbody>
                  <tr><th className="font-semibold">Bank Name:</th><td>{transaction.BankName}</td></tr>
                  <tr><th className="font-semibold">Account Name:</th><td>{transaction.BankAccountName}</td></tr>
                  <tr><th className="font-semibold">Account Number:</th><td>{transaction.BankAccountNumber}</td></tr>
                  <tr><th className="font-semibold">Payout Amount:</th><td>{transaction.PayoutAmount} {transaction.PayoutCurrency}</td></tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 items-center">
        <button 
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
        onClick={(e)=>routeToForwardToBranch(e)}
        >
          Forward to branch
        </button>
        <button 
        className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
        onClick={(e)=>routeToCreateComments(e)}
        >
          Add comment on transaction
        </button>
        <button 
        className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600"
        onClick={(e)=>routeToComments(e)}
        >
          Fetch transaction comments
        </button>
        <Button
          onClick={handlePrint}
          className="text-white flex items-center px-10 py-4 rounded-md hover:bg-red-700"
        >
          Print Transaction
        </Button>
      </div>


    </div>
  );
};

export default ShowTransaction;
