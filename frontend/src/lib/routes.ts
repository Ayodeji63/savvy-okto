export const routes = {
  // auth
  login: "/login",

  // dashboard
  dashboard: "/dashboard",
  deposit: "/dashboard/deposit",
  requestLoan: "/dashboard/request-loan",
  repayLoan: "/dashboard/repay-loan",
  groupById: (id: string) => `/group/page/${id}`,
  transactionById: (id: string) => `/transaction/${id}`
};
