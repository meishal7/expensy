export default async function getExpenses(id) {
  const expenses = await fetch(
    `https://expensy-db-default-rtdb.firebaseio.com/users/${id}/expenses.json`,
    {
      method: "GET",
    }
  );
  return await expenses.json();
}
