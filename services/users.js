export const load = () =>
  fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
    response.json()
  );

export const get = (id) =>
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((response) =>
    response.json()
  );

export const create = (data) =>
  fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((response) => response.json());

export const update = (id, data) =>
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }).then((response) => response.json());
