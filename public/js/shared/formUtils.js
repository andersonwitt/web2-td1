import baseFetch from "./fetch.js";

function post(path, data) {
  return baseFetch(`/api/${path}`, "POST", data);
}

function put(path, data, id) {
  return baseFetch(`/api/${path}/${id}`, "PUT", data);
}

function customDelete(path, id) {
  return baseFetch(`/api/${path}/${id}`, "DELETE");
}

function responseHandler(redirectPath) {
  return async function (response) {
    try {
      const obj = await response.json();

      if (!obj.success && obj.message) {
        alert(obj.message);
        return;
      }

      alert(obj.message);

      if (redirectPath) {
        window.location.href = `${window.location.origin}/${redirectPath}`;
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
      alert("Erro na solicitação. Por favor, tente novamente mais tarde.");
    }
  };
}

export function handleSubmitFor(path, redirectPath, id) {
  return function (e) {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    let payload = Object.fromEntries(formData);
    if (id) {
      put(path, payload, id).then(responseHandler(redirectPath));
    } else {
      post(path, payload).then(responseHandler(redirectPath));
    }
  };
}

export function handleDeleteFor(path, redirectPath, id) {
  return customDelete(path, id).then(responseHandler(redirectPath));
}
