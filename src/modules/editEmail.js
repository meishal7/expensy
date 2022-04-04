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

    const res = await response.json();

    return res;
  } catch (error) {
    alert(error);
  }
}
