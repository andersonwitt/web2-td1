import baseFetch from "./fetch.js";

function post(path, data) {
  return baseFetch(`/api/${path}`, "POST", data);
}

function put(path, data, id) {
  return baseFetch(`/api/${path}/${id}`, "PUT", data);
}

async function responseHandler(response) {
  try {
    const obj = await response.json();

    if (!obj.success && obj.message) {
      alert(obj.message);
      return;
    }

    alert(obj.message);
  } catch (error) {
    console.error("Erro na solicitação:", error);
    alert("Erro na solicitação. Por favor, tente novamente mais tarde.");
  }
}

export function handleSubmitFor(path, id) {
  return function (e) {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    let payload = Object.fromEntries(formData);
    if (id) {
      put(path, payload, id).then(responseHandler);
    } else {
      post(path, payload).then(responseHandler);
    }
  };
}
