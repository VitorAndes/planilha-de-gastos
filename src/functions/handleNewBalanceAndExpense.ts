export function handleNewBalance(balance: string) {
  localStorage.setItem("balance", balance);
}

export function handleNewExpense(expense: string) {
  localStorage.setItem("expense", expense);
}
