export const routes = {
  // auth
  login: "/login",

  // dashboard
  dashboard: "/dashboard",
  deposit: "/dashboard/deposit",
  requestLoan: "/dashboard/request-loan",
  repayLoan: "/dashboard/repay-loan",
  groupById: (id: string) => `/dashboard/group/${id}`,
  transactionById: (id: string) => `/transaction/${id}`
};
