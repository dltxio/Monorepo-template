export const getPaginationParams = (queryString: api.PaginationQuery) => ({
  page: queryString.page || 1,
  pageSize: queryString.pageSize || 20
});

export const collateralToDebtRatioToLVR = (ctdr: number) => (1 / ctdr) * 10_000;

const fiatFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "symbol"
});

export const numberToFormattedAud = (amount: number) =>
  fiatFormatter.format(amount);
