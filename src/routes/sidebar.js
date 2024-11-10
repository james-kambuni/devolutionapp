
const routes = [
  {
    path: "/app/dashboard", 
    icon: "HomeIcon",
    name: "Dashboard", 
    permission: 'view_dashboard',
    userType: ['AG', 'CM', 'SB', 'SYS']
  },
  {
    path: "/app/list-user",
    icon: "GroupIcon",
    name: "Users",
    permission: 'view_user',
    userType: ['CM', 'SYS']
  },
  {
    path: "/app/create-transaction",
    icon: "AddIcon",
    name: "Send",
    permission: 'Create transaction',
    userType: ['AG']
  },
  {
    path: "/app/receive",
    icon: "AddIcon",
    name: "Receive",
    permission: 'view receive',
    userType: ['AG', 'SYS']
  },
  {
    path: "/branch/list-branches",
    icon: "BranchIcon",
    name: "Branches",
    permission: 'view_branch',
    userType: ['CM', 'SYS']
  },
  {
    path: "/company/list-company-account-types",
    icon: "BankIcon",
    name: "Company",
    permission: 'view_company_account_type',
    userType: ['SYS']
  },
  {
    path: "/app/get-estimates",
    icon: "TransactionIcon",
    name: "Get Estimates",
    permission: 'view estimates',
    userType: ['AG', 'CM', 'SB', 'SYS']
  },
  {
    path: "/transaction/list-transactions",
    icon: "TransactionIcon",
    name: "Transactions",
    permission: 'view_transaction',
    userType: ['CM', 'SB', 'SYS']
  },
  {
    path: "/app/list-agent-transactions",
    icon: "TransactionIcon",
    name: "Transactions",
    permission: 'view_transaction',
    userType: ['AG']
  },
  {
    path: "/charge/list-charge-setups",
    icon: "ChargeIcon",
    name: "Charges",
    permission: 'view_charge_setup',
    userType: ['CM', 'SB', 'SYS']
  },
  {
    path: "/agent/list-agents",
    icon: "GroupIcon",
    name: "Agents",
    permission: 'view_agent',
    userType: ['CM', 'SB', 'SYS']
  },
  {
    path: "/settings/list-users",
    icon: "OutlineCogIcon",
    name: "Settings",
    permission: 'view_setting',
    userType: ['CM', 'SYS']
  }
];

export default routes;
