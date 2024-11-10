const CompanyRoutes = [
    {
        path: "/company/create-company-account",
        icon: "AddIcon",
        name: "Create Account",
        permission: 'Create account',
        userType: ['SYS']
    },
    {
        path: "/company/top-up-company-account",
        icon: "AddIcon",
        name: "Top Up Account",
        permission: 'Create top up',
        userType: ['SYS']
    },
    {
        path: "/company/list-company-account-types",
        icon: "AccountTYpeIcon",
        name: "Account types",
        permission: 'view_company_account_type',
        userType: ['SYS']
    },
    {
        path: "/company/list-company-accounts",
        icon: "AccountIcon",
        name: "Accounts",
        permission: 'view_company_account',
        userType: ['SYS']
    },
    {
        path: "/company/list-commissions",
        icon: "CommissionIcon",
        name: "Commission Distribution",
        permission: 'view_hq_branches_commission_distribution',
        userType: ['CM', 'SYS']
    }
]

export default CompanyRoutes
