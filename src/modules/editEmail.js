export default async function editEmail(token, newEmail, API_KEY) {
  const newData = {
    idToken: token,
    email: newEmail,
    returnSecureToken: true,
  };
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,

      {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (!response.ok) console.log(response.status);
    // if (response.status >= 400 && response.status < 600) {
    //   throw new Error("Bad response from server");
    // }
    const res = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    console.log("Fetch error: ", error);
    alert(error);
  }
}
