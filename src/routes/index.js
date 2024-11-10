import { lazy } from "react";
import ForwardToBranch from "../pages/transaction/ForwardToBranch";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Orders = lazy(() => import("../pages/Orders"));
const ProductsAll = lazy(() => import("../pages/ProductsAll"));
const SingleProduct = lazy(() => import("../pages/SingleProduct"));
const AddProduct = lazy(() => import("../pages/AddProduct"));
const Chats = lazy(() => import("../pages/Chats"));
const Profile = lazy(() => import("../pages/Profile"));
const Settings = lazy(() => import("../pages/Settings"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));
const Receive = lazy(() => import("../pages/Receive"));

// User management
const ListUser = lazy(() => import("../pages/user/ListUser"));
const ListPendingUser = lazy(() => import("../pages/user/ListPendingUser"));
const CreateUser = lazy(() => import("../pages/user/CreateUser"));
const EditUser = lazy(() => import("../pages/user/EditUser"));
const UnlockAccount = lazy(() => import("../pages/user/UnlockAccount"));
const MapRoleToUser = lazy(() => import("../pages/user/MapRoleToUser"));
const ApproveUser = lazy(() => import("../pages/user/ApproveUser"));

// Generic list
const UserTypes = lazy(() => import("../pages/genericList/userTypes"));
const Roles = lazy(() => import("../pages/genericList/roles"));


const RolesDetailed = lazy(() => import("../pages/genericList/rolesDetailed"));
const Permission = lazy(() => import("../pages/genericList/permission"));
const PermissionDetailed = lazy(() => import("../pages/genericList/permissionDetailed"));
const Countries = lazy(() => import("../pages/genericList/countries"));
const Cities = lazy(() => import("../pages/genericList/cities"));
const Currencies = lazy(() => import("../pages/genericList/currencies"));
const DocumentTypes = lazy(() => import("../pages/genericList/documentTypes"));
const AccountTypes = lazy(() => import("../pages/genericList/accountTypes"));
const DeliveryMethods = lazy(() => import("../pages/genericList/deliveryMethods"));
const CreateDeliveryMethod = lazy(() => import("../pages/genericList/CreateDeliveryMethod"));

// Role management
const CreateRole = lazy(() => import("../pages/genericList/role/CreateRole"));
const AddRoleToPermission = lazy(() => import("../pages/genericList/role/AddRoleToPermission"));
const EditRole = lazy(() => import("../pages/genericList/role/EditRole"));

// Permission management
const CreatePermission = lazy(() => import("../pages/genericList/permission/CreatePermission"));
const EditPermission = lazy(() => import("../pages/genericList/permission/EditPermission"));

// Branch management
const ListBranch = lazy(() => import("../pages/branch/ListBranch"));
const ListCountryManager = lazy(() => import("../pages/branch/ListCountryManager"));
const ListCountryManagerPerCountry = lazy(() => import("../pages/branch/ListCountryManagerPerCountry"));
const ListBranchAccount = lazy(() => import("../pages/branch/ListBranchAccount"));
const CreateBranchAccount = lazy(() => import("../pages/branch/CreateBranchAccount"));
const ListBranchAccountBalance = lazy(() => import("../pages/branch/ListBranchAccountBalance"));
const TopUpBranchBalance = lazy(() => import("../pages/branch/TopUpBranchBalance"));
const TopUpAgentAccount = lazy(() => import("../pages/branch/TopUpAgentAccount"));

// Rate management
const CreateRate = lazy(() => import("../pages/branch/CreateRate"));

// Agent management
const ListAgent = lazy(() => import("../pages/agent/ListAgent"));
const ListCountryAgent = lazy(() => import("../pages/agent/ListCountryAgent"));
const CreateAgentAccount = lazy(() => import("../pages/agent/CreateAgentAccount"));
const ListAgentAccounts = lazy(() => import("../pages/agent/ListAgentAccounts"));
const CommissionSetUp = lazy(() => import("../pages/agent/CommissionSetUp"));

// Company management
const ListCompanyAccountTypes = lazy(() => import("../pages/company/ListCompanyAccountTypes"));
const ListCompanyAccounts = lazy(() => import("../pages/company/ListCompanyAccounts"));
const CreateCompanyAccount = lazy(() => import("../pages/company/CreateCompanyAccount"));
const TopUpCompanyAccount = lazy(() => import("../pages/company/TopUpCompanyAccount"));
const ListCommission = lazy(() => import("../pages/company/ListCommission"));

// Charge management
const ListChargeSetup = lazy(() => import("../pages/charge/chargeSetup/ListChargeSetup"));
const CreateCharge = lazy(() => import("../pages/charge/chargeSetup/CreateCharge"));
const EditCharge = lazy(() => import("../pages/charge/chargeSetup/EditCharge"));

// Transaction management
const ListTransaction = lazy(() => import("../pages/transaction/ListTransaction"));
const ListTransactionComments = lazy(() => import("../pages/transaction/ListTransactionComments"));
const ShowTransaction = lazy(() => import("../pages/transaction/ShowTransaction"));
const CreateTransaction = lazy(() => import("../pages/transaction/CreateTransaction"));
const CreateTransactionComment = lazy(() => import("../pages/transaction/CreateTransactionComment"));
const Commission = lazy(() => import("../pages/transaction/Commission"));

const routes = [
  {path: "/dashboard", component: Dashboard,},
  {path: "/orders",component: Orders,},
  {path: "/all-products",component: ProductsAll,},
  {path: "/add-product",component: AddProduct,},
  {path: "/product/:id",component: SingleProduct,},
  {path: "/chats",component: Chats,},
  {path: "/manage-profile",component: Profile,},
  {path: "/settings",component: Settings,},
  {path: "/404",component: Page404,},
  {path: "/blank",component: Blank,},
  {path: "/receive",component: Receive,},

  // Manage user
  {path: "/list-user",component: ListUser,},
  {path: "/create-user",component: CreateUser,},
  {path: "/edit-user/:id",component: EditUser,},
  {path: "/unlock-account/:email",component: UnlockAccount,},

  {path: "/list-users",component: ListUser,},
  {path: "/list-pending-users",component: ListPendingUser,},
  {path: "/map-user-to-role",component: MapRoleToUser,},
  {path: "/approve-user/:id",component: ApproveUser,},

  // Manage branch
  {path: "/list-branches",component: ListBranch,},
  {path: "/list-all-country-managers",component: ListCountryManager,},
  {path: "/list-country-managers",component: ListCountryManagerPerCountry,},
  {path: "/list-branch-accounts",component: ListBranchAccount,},
  {path: "/create-branch-account",component: CreateBranchAccount,},
  {path: "/list-branch-account-balances",component: ListBranchAccountBalance,},
  {path: "/top-up-branch-balance",component: TopUpBranchBalance,},
  {path: "/top-up-agent-account",component: TopUpAgentAccount,},

  // Manage rate
  {path: "/create-rate",component: CreateRate,},

  // Manage agent
  {path: "/list-agents",component: ListAgent,},
  {path: "/create-agent-account",component: CreateAgentAccount,},
  {path: "/list-country-agents",component: ListCountryAgent,},
  {path: "/list-agent-accounts",component: ListAgentAccounts,},
  {path: "/create-agent-commission",component: CommissionSetUp,},

  // Manage company
  {path: "/list-company-account-types",component: ListCompanyAccountTypes,},
  {path: "/list-company-accounts",component: ListCompanyAccounts,},
  {path: "/create-company-account",component: CreateCompanyAccount,},
  {path: "/top-up-company-account",component: TopUpCompanyAccount,},
    {path: "/list-commissions",component: ListCommission,},

  // Manage charge
  {path: "/list-charge-setups",component: ListChargeSetup,},
  {path: "/create-charge",component: CreateCharge,},
  {path: "/edit-charge/:id",component: EditCharge,},

  // Manage transaction
  {path: "/create-transaction",component: CreateTransaction,},
  {path: "/list-transactions",component: ListTransaction,},
  {path: "/show-transaction/:id",component: ShowTransaction,},
  {path: "/commission",component: Commission,},

  {path: "/show-agent-transaction/:id",component: ShowTransaction,},
  {path: "/create-transaction-comments/:id",component: CreateTransactionComment,},
  {path: "/show-transaction-comments/:id",component: ListTransactionComments,},
  {path: "/forward-to-branch/:id",component: ForwardToBranch,},

  {path: "/get-estimates",component: Commission,},
  {path: "/list-agent-transactions",component: ListTransaction,},

  // Manage Generic list
  {path: "/list-user-types",component: UserTypes,},
  {path: "/list-roles",component: Roles,},
  {path: "/list-role-details",component: RolesDetailed,},
  {path: "/list-permissions",component: Permission,},
  {path: "/list-permission-details",component: PermissionDetailed,},
  {path: "/list-countries",component: Countries,},
  {path: "/list-cities",component: Cities,},
  {path: "/list-currencies",component: Currencies,},
  {path: "/list-document-types",component: DocumentTypes,},
  {path: "/list-account-types",component: AccountTypes,},
  {path: "/list-delivery-methods",component: DeliveryMethods,},
  {path: "/create-delivery-method",component: CreateDeliveryMethod,},

  // Manage role
  {path: "/create-role",component: CreateRole,},
  {path: "/edit-role/:id",component: EditRole,},
  {path: "/add-role-to-permission",component: AddRoleToPermission,},

  // Manage permission
  {path: "/create-permission",component: CreatePermission,},
  {path: "/edit-permission/:id",component: EditPermission,},
];

export default routes;
