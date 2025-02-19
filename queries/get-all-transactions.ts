export function getAllTransactions(client: any, transactionID: number) {
  return client
    .from("transactions")
    .select(
      `
      id,
      name
    `,
    )
    .eq("id", transactionID)
    .throwOnError()
    .single();
}
