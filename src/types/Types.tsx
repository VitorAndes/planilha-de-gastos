export type ExpenseData = {
  expense: string;
  paymentMethod: string;
};

export type balanceData = {
  balance: string;
  paymentMethod: string;
};

export type chartDataType = {
  paymentMethod: string;
  expense: number;
};

export type ExpenseType = {
  local: string;
  expense: string;
  tag: string;
  paymentMethod: string;
  paymentDate: string;
};
