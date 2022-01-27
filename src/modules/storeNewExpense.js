export default async function storeNewExpense(expenseData, id) {
  try {
    const response = await fetch(
      `https://expensy-db-default-rtdb.firebaseio.com/users/${id}/expenses.json`,
      {
        method: "POST",
        body: JSON.stringify(expenseData),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (response.status >= 400 && response.status < 600) {
      throw new Error("Bad response from server");
    }
    const res = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    console.log("Fetch error: ", error);
    alert(error);
  }
}
