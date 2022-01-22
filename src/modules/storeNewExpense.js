export default function storeNewExpense(expense, id) {
  const response = fetch(
    `https://expensy-db-default-rtdb.firebaseio.com/users/${id}/expenses.json`,
    {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  return response;
}
