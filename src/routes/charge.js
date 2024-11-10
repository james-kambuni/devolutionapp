const ChargeRoutes = [
    {
        path: "/charge/create-charge",
        icon: "AddIcon",
        name: "Create Charge",
        permission: 'Create charge',
        userType: ['SYS']
    },
    {
        path: "/charge/list-charge-setups",
        icon: "ChargeIcon",
        name: "Charge setup",
        permission: 'view_charge',
        userType: ['CM', 'SYS']
    },
]

export default ChargeRoutes
