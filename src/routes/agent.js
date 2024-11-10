const AgentRoutes = [
    {
        path: "/agent/create-agent-account",
        icon: "AddIcon",
        name: "Create Agent Account",
        permission: 'Create agent',
        userType: ['CM', 'SYS']
    },
    {
        path: "/agent/list-agents",
        icon: "GroupIcon",
        name: "All Agents",
        permission: 'view_agent',
        userType: ['CM', 'SYS']
    },
    {
        path: "/agent/create-agent-commission",
        icon: "AddIcon",
        name: "Commission Set Up",
        permission: 'Create commission',
        userType: ['CM', 'SYS'],
    },
    {
        path: "/agent/list-country-agents",
        icon: "CountryIcon",
        name: "Country Agents",
        permission: 'view_agent',
        userType: ['CM', 'SYS']
    },
    {
        path: "/agent/list-agent-accounts",
        icon: "AccountIcon",
        name: "Agent Accounts",
        permission: 'view_agent_account',
        userType: ['CM', 'SYS']
    }
]

export default AgentRoutes
