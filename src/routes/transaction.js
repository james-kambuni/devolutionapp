const TransactionRoutes = [
    {
        path: "/transaction/create-transaction",
        icon: "AddIcon",
        name: "Create Transaction",
        permission: 'Create transaction',
        userType: ['AG']
    },
    {
        path: "/transaction/list-transactions",
        icon: "TransactionIcon",
        name: "Transactions",
        permission: 'view_transaction',
        userType: ['AG', 'CM', 'SB', 'SYS']
    },
    {
        path: "/transaction/commission",
        icon: "CashIcon",
        name: "Transaction Commission",
        permission: 'view commission',
        userType: ['AG', 'CM', 'SB', 'SYS']
    },
]

export default TransactionRoutes
