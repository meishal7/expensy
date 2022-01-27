export default async function deleteExpense(userId, expenseId) {
  try {
    const response = await fetch(
      `https://expensy-db-default-rtdb.firebaseio.com/users/${userId}/expenses/${expenseId}`,
      {
        method: "DELETE",
      }
    );
    if (response.status >= 400 && response.status < 600) {
      throw new Error("Bad response from server");
    }

    console.log(response);
    return response;
  } catch (error) {
    console.log("Fetch error: ", error);
    alert(error);
  }
}
