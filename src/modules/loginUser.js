export default function loginUser(key, email, passw) {
  const response = fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
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
