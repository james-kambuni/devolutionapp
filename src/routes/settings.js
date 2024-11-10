const settingsRoutes = [
      {
        path: "/settings/create-user",
        icon: "AddIcon",
        name: "Create User",
        permission: 'Create user',
        userType: ['CM', 'SYS']
      },
      {
        path: "/settings/list-pending-users",
        icon: "GroupIcon",
        name: "Pending Users",
        permission: 'view_user',
        userType: ['CM', 'SYS']
      },
      {
        path: "/settings/list-users",
        icon: "GroupIcon",
        name: "Users",
        permission: 'view_user',
        userType: ['CM', 'SYS']
      },
      {
        path: "/settings/list-user-types",
        icon: "GroupIcon",
        name: "User Types",
        permission: 'view_user_type',
        userType: ['CM', 'SYS']
      },
      {
        path: "/settings/map-user-to-role",
        icon: "UserMapIcon",
        name: "Map user to role",
        permission: 'Create role',
        userType: ['SYS']
      },
      {
        path: "/settings/create-role",
        icon: "AddIcon",
        name: "Create Role",
        permission: 'Create role',
        userType: ['SYS']
      },
      {
        path: "/settings/list-roles",
        icon: "RoleIcon",
        name: "Roles",
        permission: 'view_role',
        userType: ['CM', 'SYS']
      },
      {
        path: "/settings/list-role-details",
        icon: "RoleIcon",
        name: "Role Details",
        permission: 'view_role_detail',
        userType: ['CM', 'SYS']
      },
      {
        path: "/settings/add-role-to-permission",
        icon: "AddIcon",
        name: "Add Role To Permission",
        permission: 'view_role_detail',
        userType: ['SYS']
      },
      {
        path: "/settings/create-permission",
        icon: "AddIcon",
        name: "Create Permission",
        permission: 'Create permission',
        userType: ['SYS']
      },
      {
        path: "/settings/list-permissions",
        icon: "PermissionIcon",
        name: "Permissions",
        permission: 'view_permission',
        userType: ['CM', 'SYS']
      },
      {
        path: "/settings/list-permission-details",
        icon: "PermissionIcon",
        name: "Permission details",
        permission: 'view_permission',
        userType: ['SYS']
      },
      {
        path: "/settings/list-countries",
        icon: "CountryIcon",
        name: "Countries",
        permission: 'view_country',
        userType: ['SYS']
      },
      {
        path: "/settings/list-cities",
        icon: "CityIcon",
        name: "Cities",
        permission: 'view_city',
        userType: ['CM', 'SYS']
      },
      {
        path: "/settings/list-currencies",
        icon: "CurrencyIcon",
        name: "Currencies",
        permission: 'view_currency',
        userType: ['CM','SYS']
      },
      {
        path: "/settings/list-document-types",
        icon: "DocumentIcon",
        name: "Document types",
        permission: 'view_document_type',
        userType: ['CM','SYS']
      },
      {
        path: "/settings/list-account-types",
        icon: "AccountTYpeIcon",
        name: "Account Types",
        permission: 'view_account_type',
        userType: ['CM', 'SYS']
      },
      {
        path: "/settings/create-delivery-method",
        icon: "AddIcon",
        name: "Create Delivery Method",
        permission: 'Create delivery method',
        userType: ['CM','SYS']
      },
      {
        path: "/settings/list-delivery-methods",
        icon: "DeliveryIcon",
        name: "Delivery Methods",
        permission: 'view_delivery_method',
        userType: ['CM', 'SYS']
      }
  ]
  
  export default settingsRoutes
  