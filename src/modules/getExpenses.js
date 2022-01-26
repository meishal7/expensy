export default async function getExpenses(id) {
  try {
    const response = await fetch(
      `https://expensy-db-default-rtdb.firebaseio.com/users/${id}/expenses.json`,
      {
        method: "GET",
      }
    );
    if (response.status >= 400 && response.status < 600) {
      throw new Error("Bad response from server");
    }

    const expenses = await response.json();
    return expenses;
  } catch (error) {
    console.log("Fetch error: ", error);
    alert(error);
  }
}
