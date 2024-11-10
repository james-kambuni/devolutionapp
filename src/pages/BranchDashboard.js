import React, {useState, useEffect} from 'react'
import InfoCard from '../components/Cards/InfoCard';
import { PeopleIcon, MoneyIcon } from "../icons";
import api from '../Api';
import { toast } from 'react-hot-toast';
import RoundIcon from "../components/RoundIcon";
import PageTitle from '../components/Typography/PageTitle';
import TransactionsTable from '../components/TransactionsTable';
import AgentAccountsTable2 from '../components/AgentAccountsTable2';
import { Card, CardBody } from '@windmill/react-ui'
import AgentsTable2 from '../components/AgentsTable2';
import BranchAccountBalancesTable2 from '../components/BranchAccountBalancesTable2';

import ChartLegend from "../components/Chart/ChartLegend";
import ChartCard from "../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import { useUser } from '../context/UserContext';
import Select from 'react-select';  

function BranchDashboard() {

  const [agentAccounts, setAgentAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [branchAccountBalances, setBranchAccountBalances] = useState([]);

  const {user} = useUser()

  const [formData, setFormData] = useState({
    BranchId: user.branchId,
    AgentUserId: '1017',
    Status: 'INITIATED',
  });

  const [agents, setAgents] = useState([]);


  useEffect(()=>{
        const getData = async (e) => {
            const payload = {
            ServiceCode: 'FETCH_TXNS_BYSTATUS',
            ...formData,
            };
        
            try {
            let response = await api.create(payload);
            if (response.ResponseCode === '000') {

                setTransactions(response.Transanctions)
                
            } else {
                toast.error("Error: Failure to get transactions");
            }
            } catch (error) {
            toast.error('Error: ' + error);
            }
        };

        getData()
    },[formData])

  useEffect(()=>{
    if (formData.AgentUserId) {
      const getData = async (e) => {
          const payload = {
            ServiceCode: 'GET_AGENT_ACCOUNTS',
            AgentUserId: formData.AgentUserId
          };
      
          try {
            let response = await api.create(payload);
            if (response.ResponseCode === '000') {
              setAgentAccounts(response.Agents)
            } else {
              toast.error(response.ResponseDescription);
            }
          } catch (error) {
            toast.error('Error: ' + error);
          }
        };

      getData()
    }
  },[formData.AgentUserId])


  useEffect(() => {
      if (formData.BranchId) {
          const getCountryManagers = async () => {
              const payload = {
                  ServiceCode: 'GET_AGS_PER_BRANCH',
                  BranchId: formData.BranchId
              };

              try {
                  let response = await api.create(payload);
                  if (response.ResponseCode === '000') {
                    setAgents(response.Agents);
                    setFormData({
                      AgentUserId: response.Agents[0].UserId
                    })
                  } else {
                      toast.error("Error: " + response.ResponseDescription);
                  }
              } catch (error) {
                  toast.error('Error: ' + error);
              }
          };

          getCountryManagers();
      }
  }, [formData.BranchId]);



  useEffect(()=>{
    if (formData.BranchId) {
      const getData = async (e) => {
          const payload = {
            ServiceCode: 'GET_BR_ACCOUNTS_W_BAL',
            BranchId: formData.BranchId 
          };
      
          try {
            let response = await api.create(payload);
            if (response.ResponseCode === '000') {
              setBranchAccountBalances(response.Accounts)
            } else {
              toast.error("Error: Failure to get country managers");
            }
          } catch (error) {
            toast.error('Error: ' + error);
          }
        };

      getData()
    }
  },[formData.BranchId])


  const countTransactionsByStatus = (status) => {
    return transactions.filter((transaction) => transaction.RemitStatus === status).length;
  };


  const agentOptions = agents.map((agent) => ({
      value: agent.UserId,
      label: `${agent.FirstName} ${agent.MiddleName} ${agent.LastName}`, 
  }));


  const handleSelectChange2 = (selectedOption) => {
    setFormData((prevData) => ({
        ...prevData,
        AgentUserId: selectedOption.value,
    }));
  };

  const transactionOptions = {
    data: {
      datasets: [
        {
          data: [
            countTransactionsByStatus("CANCELLED"),
            countTransactionsByStatus("INITIATED"),
            countTransactionsByStatus("COMPLETED"),
            countTransactionsByStatus("SUSPENDED"),
            countTransactionsByStatus("FAILED"),
          ],
          backgroundColor: [
            "#FF6B6B", 
            "#4CAF50", 
            "#3B82F6", 
            "#FFC107", 
            "#9E9E9E"  
          ],
          label: "Dataset 1",
        },
      ],
      labels: ["CANCELLED", "INITIATED", "COMPLETED", "SUSPENDED", "FAILED"],
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: false,
    },
  };
  
  const transactionLegends = [
    { title: "CANCELLED", color: "bg-red-500" },
    { title: "INITIATED", color: "bg-green-500" },
    { title: "COMPLETED", color: "bg-blue-500" },
    { title: "SUSPENDED", color: "bg-yellow-500" },
    { title: "FAILED", color: "bg-gray-500" },
  ];


  const countTransactionsByStatusAndMonth = () => {
    const statusCounts = {
      CANCELLED: Array(12).fill(0),
      INITIATED: Array(12).fill(0),
      COMPLETED: Array(12).fill(0),
      SUSPENDED: Array(12).fill(0),
      FAILED: Array(12).fill(0),
    };

    transactions.forEach((transaction) => {
      const month = new Date(transaction.InitiatedDate).getMonth(); // Get the month (0 for January, 11 for December)
      const status = transaction.RemitStatus.toUpperCase(); // Convert to uppercase for consistency

      if (statusCounts[status]) {
        statusCounts[status][month]++;
      }
    });

    return statusCounts;
  };

  // Get the monthly counts for each status
  const monthlyCounts = countTransactionsByStatusAndMonth();


  const lineOptions = {
    data: {
      labels: [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
      ],
      datasets: [
        {
          label: "Cancelled",
          backgroundColor: "rgba(229, 62, 62, 0.5)",
          borderColor: "#e53e3e",
          data: monthlyCounts.CANCELLED,
          fill: false,
        },
        {
          label: "Initiated",
          backgroundColor: "rgba(72, 187, 120, 0.5)",
          borderColor: "#48bb78",
          data: monthlyCounts.INITIATED,
          fill: false,
        },
        {
          label: "Completed",
          backgroundColor: "rgba(66, 153, 225, 0.5)",
          borderColor: "#4299e1",
          data: monthlyCounts.COMPLETED,
          fill: false,
        },
        {
          label: "Suspended",
          backgroundColor: "rgba(237, 137, 54, 0.5)",
          borderColor: "#ed8936",
          data: monthlyCounts.SUSPENDED,
          fill: false,
        },
        {
          label: "Failed",
          backgroundColor: "rgba(160, 174, 192, 0.5)",
          borderColor: "#a0aec0",
          data: monthlyCounts.FAILED,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month",
          },
        },
        y: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Number of Transactions",
          },
        },
      },
    },
    legend: {
      display: true,
    },
  };
  

  const handleSelectChange9 = (event) => {

    const { value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      Status: value
    }));
  };
  

  return (
    <div className='flex flex-col'>
      <div className="grid gap-6 mb-6 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard title="Total agents" value={agents?.length}>
            <RoundIcon
              icon={PeopleIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>

          <InfoCard title="Total transactions" value={transactions?.length}>
            <RoundIcon
              icon={MoneyIcon}
              iconColorClass="text-green-500 dark:text-green-100"
              bgColorClass="bg-green-100 dark:bg-green-500"
              className="mr-4"
            />
          </InfoCard>

          <Card>
            <CardBody>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Transaction Type</p>
                <select
                id="Status"
                name="Status"
                value={formData.Status}
                onChange={handleSelectChange9}
                required
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-3"
                >
                <option value="">Select ...</option>
                <option value="CANCELLED">CANCELLED</option>
                <option value="INITIATED">INITIATED</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="SUSPENDED">SUSPENDED</option>
                <option value="FAILED">FAILED</option>
                </select>
            </CardBody>
           </Card>
      </div>

      <div className="grid gap-6 mb-6 grid-cols-1 lg:grid-cols-3">
        <div className="col-span-3 md:col-span-2">
          <ChartCard title="Transaction Analytics">
            <Line {...lineOptions} />
          </ChartCard>
        </div>

        <div className="col-span-3 md:col-span-1">
          <ChartCard className="col-span-3 md:col-span-1" title="Transactions">
            <Doughnut {...transactionOptions} />
            <ChartLegend legends={transactionLegends} />
          </ChartCard>
        </div>
      </div>


      <div className="grid gap-6 mb-6 grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-3 md:col-span-2">
            <CardBody className="flex flex-col">
              <div className='mb-4 flex flex-col xl:flex-row items-start xl:items-center justify-between'>
                <PageTitle>Country Agents</PageTitle>
              </div>
  
              <AgentsTable2 resultsPerPage={10} agents={agents} />
            </CardBody>
        </Card>

        <Card className="col-span-3 md:col-span-1">
          <CardBody className="flex flex-col">
            <div className='mb-4 flex flex-col xl:flex-row items-start xl:items-center justify-between'>
              <PageTitle>Agent Accounts</PageTitle>

              <div className="">
                  <Select
                      id="AgentUserId"
                      name="AgentUserId"
                      value={agentOptions.find((option) => option.value === formData.AgentUserId)}
                      onChange={handleSelectChange2}
                      options={agentOptions}
                      placeholder="Select agent"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                  />
              </div>
            </div>

            <AgentAccountsTable2 resultsPerPage={10} agentAccounts={agentAccounts} />
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-6 mb-8 grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-3 md:col-span-1">
            <CardBody className="flex flex-col">
                <div className='mb-4 flex flex-col xl:flex-row items-start xl:items-center justify-between'>
                  <PageTitle>Branch Accounts Balances</PageTitle>
                </div>
                <BranchAccountBalancesTable2 resultsPerPage={10} branchAccountBalances={branchAccountBalances} />
            </CardBody>
        </Card>

        <Card className="col-span-3 md:col-span-2">
            <CardBody className="flex flex-col">
                <PageTitle>Transactions</PageTitle>
                <TransactionsTable resultsPerPage={10} transactions={transactions} />
            </CardBody>
        </Card>
      </div>

    </div>
  )
}

export default BranchDashboard
