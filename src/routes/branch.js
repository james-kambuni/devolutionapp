const BranchRoutes = [
    {
        path: "/branch/list-branches",
        icon: "BranchIcon",
        name: "Branches",
        permission: 'view_branch',
        userType: ['CM', 'SYS']
    },
    {
        path: "/branch/list-all-country-managers",
        icon: "GroupIcon",
        name: "All Country managers",
        permission: 'view_country_manager',
        userType: ['SYS']
    },
    {
        path: "/branch/list-country-managers",
        icon: "CountryIcon",
        name: "Country managers",
        permission: 'view_country_manager',
        userType: ['SYS']
    },
    {
        path: "/branch/create-branch-account",
        icon: "AddIcon",
        name: "Create Account",
        permission: 'Create account',
        userType: ['SYS']
    },
    {
        path: "/branch/list-branch-accounts",
        icon: "AccountIcon",
        name: "Branch accounts",
        permission: 'view_branch_account',
        userType: ['CM','SYS']
    },
    {
        path: "/branch/create-rate",
        icon: "AddIcon",
        name: "Add rates",
        permission: 'Create rate',
        userType: ['CM', 'SYS']
    },
    {
        path: "/branch/top-up-branch-balance",
        icon: "AddIcon",
        name: "Top Up account",
        permission: 'Create top up',
        userType: ['SYS']
    },
    {
        path: "/branch/list-branch-account-balances",
        icon: "TransactionIcon",
        name: "Branch account balance",
        permission: 'view_branch_account_balance',
        userType: ['CM', 'SYS']
    },
    {
        path: "/branch/top-up-agent-account",
        icon: "AddIcon",
        name: "Top up agent account",
        permission: 'Create agent top up',
        userType: ['CM', 'SYS']
    },
]

export default BranchRoutes
