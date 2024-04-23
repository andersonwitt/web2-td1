function baseFetch(url, method, data = {}) {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : {},
  });
}

export default baseFetch;
