/**
 * A fetcher function for all of your api interactions. You can also use this with `useSWR` hook.
 * @typedef Props
 * @property {boolean} [json] Sets the `Content-Type` header to `application/json`. Default: true
 * @property {boolean} [auth] Sets the `Authorization` header if found in localStorage. Default: true
 * @property {string} [accessToken] Access token
 * @property {boolean} [retryUnauthenticated] Re-try unauthenticated requests. Default: true
 *
 * @param {string} resource Must start with slash like "/auth/login"
 * @param {RequestInit & Props} init
 *
 * @example
    try {
      const response = await fetcher("/auth/login", {
        method: "POST",
        body: {
          email,
          password
        },
      });
      console.log(response)
    } catch (err) {
      console.log(err.info)
    }
  };
 */
const fetcher = async (resource, init = {}) => {
  // const accessToken = localStorage.getItem("ACCESS_TOKEN");
  // const refreshToken = localStorage.getItem("REFRESH_TOKEN");

  /** @type {RequestInit & Props} */
  const defaults = {
    json: true,
    auth: true,
    retryUnauthenticated: true,
    ...init,
  };

  /** @type {RequestInit & Props} */
  const requestInit = {
    ...defaults,
    headers: {
      Accept: "application/json",
      ...(defaults.json && { "Content-Type": "application/json" }),
      ...(defaults.auth && init.accessToken && { Authorization: `Bearer ${init.accessToken}` }),
    },
    body: defaults.json ? JSON.stringify(defaults.body) : defaults.body,
  };

  const response = await fetch(`${resource}`, requestInit);

  if (!response.ok) {

    const error = new Error("An error occurred while fetching the data.");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  try {
    const result = await response.json();
    return result;
  } catch (err) { return  console.log(err)}
};

export default fetcher;