export default async function authFetch(url, key, object) {
  try {
    const response = await fetch(`${url}${key}`, object);
    if (response.status >= 400 && response.status < 600) {
      throw new Error("Bad response from server");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Fetch error: ", error);
    alert(error);
  }
}
