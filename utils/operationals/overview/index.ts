type Transaction = {
  amount: number;
  description: string;
  date: string;
  created_at: string;
  user_id: string;
  type: "income" | "expense";
  status: string;
  currency: string;
  id: string;
};

// export const calculateBalance = (
//   transactions: Transaction[],
// ): { balance: number } => {
//   console.log("transactions", transactions);

//   const result = transactions.reduce(
//     (acc, transaction) => {
//       if (transaction.type === "income") {
//         acc.totalIncome += transaction.amount;
//       } else if (transaction.type === "expense") {
//         acc.totalExpense += transaction.amount;
//       }
//       return acc;
//     },
//     { totalIncome: 0, totalExpense: 0 },
//   );

//   const balance = result.totalIncome - result.totalExpense;
//   return { balance };
// };
