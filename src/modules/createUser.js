export default function createUser(key, email, passw) {
  const response = fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
    {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: passw,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}
